package controllers

import (
	"log"
	"net/http"
	"SE-Project/Back-End/database"
	"SE-Project/Back-End/models"
	"github.com/gin-gonic/gin"
)

type PaymentRequest struct {
	UserID  uint    `json:"user_id"`
	OrderID uint    `json:"order_id"`
	Amount  float64 `json:"amount"`
	CardDetails struct {
		Number string `json:"number"`
		Expiry string `json:"expiry"`
	} `json:"card_details"`
}

type PlaceOrderWithPaymentRequest struct {
	UserID      uint    `json:"user_id"`
	CardDetails struct {
		Number string `json:"number"`
		Expiry string `json:"expiry"`
	} `json:"card_details"`
}

// Simulate standalone payment (not recommended without order)
func HandlePayment(c *gin.Context) {
	var req PaymentRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		log.Println("Payment bind error:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payment data"})
		return
	}

	log.Printf("Processing payment: user %d, order %d, amount $%.2f, card ending in %s",
		req.UserID, req.OrderID, req.Amount, req.CardDetails.Number)

	c.JSON(http.StatusOK, gin.H{"message": "Payment successful"})
}

// Pay and place order at once
func PlaceOrderWithPayment(c *gin.Context) {
	var req PlaceOrderWithPaymentRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
		return
	}

	var cartItems []models.CartItem
	if err := database.DB.Where("user_id = ?", req.UserID).Find(&cartItems).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch cart items"})
		return
	}

	if len(cartItems) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cart is empty"})
		return
	}

	// Calculate total price
	var total float64 = 0
	for _, item := range cartItems {
		total += float64(item.Quantity) * item.Price
	}

	// Simulate payment log
	log.Printf("[Payment] User %d paid $%.2f with card ending in %s",
		req.UserID, total, req.CardDetails.Number[len(req.CardDetails.Number)-4:])

	// Create Order
	order := models.Order{
		UserID:     req.UserID,
		TotalPrice: total,
		Status:     "Placed",
	}
	if err := database.DB.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	// Add to order_items
	for _, item := range cartItems {
		orderItem := models.OrderItem{
			OrderID:  order.ID,
			UserID:   item.UserID,
			MenuID:   item.MenuID,
			Name:     item.Name,
			Quantity: item.Quantity,
			Price:    item.Price,
		}
		database.DB.Create(&orderItem)
	}

	// Clear cart
	database.DB.Where("user_id = ?", req.UserID).Delete(&models.CartItem{})

	c.JSON(http.StatusOK, gin.H{
		"order_id": order.ID,
		"message":  "Payment successful and order placed",
	})
}
