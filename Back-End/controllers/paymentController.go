package controllers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PaymentRequest struct {
	UserID     uint `json:"user_id"`
	OrderID    uint `json:"order_id"`
	Amount     float64 `json:"amount"`
	CardDetails struct {
		Number string `json:"number"`
		Expiry string `json:"expiry"`
	} `json:"card_details"`
}

func HandlePayment(c *gin.Context) {
	var req PaymentRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		log.Println("Payment bind error:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payment data"})
		return
	}

	log.Printf("Processing payment: user %d, order %d, amount $%.2f, card ending in %s",
		req.UserID, req.OrderID, req.Amount, req.CardDetails.Number)

	// Simulate successful payment
	c.JSON(http.StatusOK, gin.H{"message": "Payment successful"})
}
