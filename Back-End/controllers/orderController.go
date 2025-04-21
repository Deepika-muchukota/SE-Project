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
