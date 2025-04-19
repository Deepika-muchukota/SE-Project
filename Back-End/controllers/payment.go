package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v78"
	"github.com/stripe/stripe-go/v78/checkout/session"
)

type CheckoutItem struct {
	Name     string `json:"name"`
	Price    int64  `json:"price"`    // in cents
	Quantity int64  `json:"quantity"` // whole number
}

func CreateCheckoutSession(c *gin.Context) {
	var req struct {
		Items []CheckoutItem `json:"items"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	stripe.Key = "sk_test_51REKFG00Mz4anjn8zqV6Nt4ly0tOpcFUcq1QtXxUrBA0Jp4dOAIpne447zY7fBRdfbGoOyJM8OmxQgezuOu5wZtM00MKyBqkhV"

	var lineItems []*stripe.CheckoutSessionLineItemParams
	for _, item := range req.Items {
		lineItems = append(lineItems, &stripe.CheckoutSessionLineItemParams{
			PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
				Currency: stripe.String("usd"),
				ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
					Name: stripe.String(item.Name),
				},
				UnitAmount: stripe.Int64(item.Price),
			},
			Quantity: stripe.Int64(item.Quantity),
		})
	}

	params := &stripe.CheckoutSessionParams{
		PaymentMethodTypes: stripe.StringSlice([]string{"card"}),
		LineItems:          lineItems,
		Mode:               stripe.String("payment"),
		SuccessURL:         stripe.String("http://localhost:3000/success"),
		CancelURL:          stripe.String("http://localhost:3000/cancel"),
	}

	s, err := session.New(params)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"sessionId": s.ID})
}
