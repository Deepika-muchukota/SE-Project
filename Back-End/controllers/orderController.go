package controllers

import (
	"SE-Project/Back-End/database"
	"SE-Project/Back-End/models"
	"math"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func FinalizeOrder(c *gin.Context) {
	userIdStr := c.Param("userId")
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var cartItems []models.CartItem
	if err := database.DB.Where("user_id = ?", userId).Find(&cartItems).Error; err != nil || len(cartItems) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cart is empty"})
		return
	}

	var total float64
	for _, item := range cartItems {
		total += item.Price * float64(item.Quantity)
	}
	total = math.Round(total*100) / 100

	order := models.Order{
		UserID:     uint(userId),
		TotalPrice: total,
		Status:     "Placed",
	}
	if err := database.DB.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Order creation failed"})
		return
	}

	for _, item := range cartItems {
		orderItem := models.OrderItem{
			OrderID:  order.ID,
			MenuID:   item.MenuID,
			Name:     item.Name,
			Price:    item.Price,
			Quantity: item.Quantity,
			UserID:   uint(userId),
		}
		if err := database.DB.Create(&orderItem).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save order items"})
			return
		}
	}

	// ✅ Empty Cart
	if err := database.DB.Where("user_id = ?", userId).Delete(&models.CartItem{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to clear cart after placing order"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "Order placed successfully",
		"order_id": order.ID,
	})
}

func GetOrdersByUser(c *gin.Context) {
	userId := c.Param("userId")

	var orders []models.Order
	err := database.DB.
		Where("user_id = ?", userId).
		Preload("OrderItems").
		Order("created_at desc").
		Find(&orders).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get orders"})
		return
	}

	var formattedOrders []gin.H
	for _, order := range orders {
		var items []gin.H
		for _, item := range order.OrderItems {
			items = append(items, gin.H{
				"name":     item.Name,
				"quantity": item.Quantity,
				"price":    item.Price,
			})
		}

		formattedOrders = append(formattedOrders, gin.H{
			"order_id":   order.ID,
			"total":      order.TotalPrice,
			"status":     order.Status,
			"created_at": order.CreatedAt,
			"items":      items,
		})
	}

	c.JSON(http.StatusOK, formattedOrders)
}

func GetSingleOrderDetails(c *gin.Context) {
	userID := c.Param("userId")
	orderID := c.Param("orderId")

	var order models.Order
	if err := database.DB.
		Where("id = ? AND user_id = ?", orderID, userID).
		First(&order).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}

	var items []models.OrderItem
	if err := database.DB.
		Where("order_id = ?", orderID).
		Find(&items).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch order items"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"order": gin.H{
			"id":          order.ID,
			"user_id":     order.UserID,
			"total_price": order.TotalPrice,
			"status":      order.Status,
			"created_at":  order.CreatedAt,
			"items":       items,
		},
	})
}

func GetUserOrderStats(c *gin.Context) {
	userID := c.Param("userId")

	var totalOrders int64
	var totalSpent float64
	var totalItems int64

	database.DB.Model(&models.Order{}).
		Where("user_id = ?", userID).
		Count(&totalOrders).
		Select("COALESCE(SUM(total_price), 0)").Row().Scan(&totalSpent)

	database.DB.Model(&models.OrderItem{}).
		Where("user_id = ?", userID).
		Select("COALESCE(SUM(quantity), 0)").Row().Scan(&totalItems)

	c.JSON(http.StatusOK, gin.H{
		"user_id":      userID,
		"total_orders": totalOrders,
		"total_spent":  totalSpent,
		"total_items":  totalItems,
	})
}

func GetMostRecentOrder(c *gin.Context) {
    userIDStr := c.Param("userId")
    userID, err := strconv.Atoi(userIDStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
        return
    }

    var order models.Order
    result := database.DB.
        Where("user_id = ?", userID).
        Order("created_at DESC").
        First(&order)

    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "No orders found"})
        return
    }

    var orderItems []models.OrderItem
    database.DB.
        Where("order_id = ?", order.ID).
        Find(&orderItems)

    c.JSON(http.StatusOK, gin.H{
        "order_id":     order.ID,
        "user_id":      order.UserID,
        "total_price":  order.TotalPrice,
        "status":       order.Status,
        "created_at":   order.CreatedAt,
        "items":        orderItems,
    })
}

type PopularItem struct {
    MenuID   uint    `json:"menu_id"`
    Name     string  `json:"name"`
    OrderCount int   `json:"order_count"`
    TotalQty  int     `json:"total_quantity"`
}

func GetMostOrderedItems(c *gin.Context) {
    var results []PopularItem

    query := `
        SELECT menu_id, name, COUNT(*) AS order_count, SUM(quantity) AS total_quantity
        FROM order_items
        GROUP BY menu_id, name
        ORDER BY total_quantity DESC
        LIMIT 5;
    `
    if err := database.DB.Raw(query).Scan(&results).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch popular items"})
        return
    }

    c.JSON(http.StatusOK, results)
}
