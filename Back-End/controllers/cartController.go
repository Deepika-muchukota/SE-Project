package controllers

import (
	"SE-Project/Back-End/database"
	"SE-Project/Back-End/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Add item to cart
func AddItemToCart(c *gin.Context) {
	var input models.CartItem
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Fetch menu item info
	var menu models.MenuItem
	if err := database.DB.First(&menu, input.MenuID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Menu item not found"})
		return
	}

	var existing models.CartItem
	result := database.DB.
		Where("user_id = ? AND menu_id = ?", input.UserID, input.MenuID).
		First(&existing)

	if result.RowsAffected > 0 {
		existing.Quantity = input.Quantity
		if err := database.DB.Save(&existing).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update quantity"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Quantity updated", "cartItem": existing})
		return
	}

	// Add name and price to the new entry
	input.Name = menu.Name
	input.Price = menu.Price

	if err := database.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add item"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Item added to cart", "cartItem": input})
}


// Get cart items for a user
func FetchCartItems(c *gin.Context) {
	var cartItems []models.CartItem
	userID := c.Param("userId")

	result := database.DB.Where("user_id = ?", userID).Find(&cartItems)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"cartItems": cartItems})
}

// Delete specific item from cart
func DeleteItemFromCart(c *gin.Context) {
	itemID := c.Param("id")

	result := database.DB.Delete(&models.CartItem{}, itemID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Item deleted from cart"})
}

// Empty the entire cart for a user
func EmptyCart(c *gin.Context) {
    userID := c.Param("userId")
    
    if userID == "15" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
        return
    }

    result := database.DB.Where("user_id = ?", userID).Delete(&models.CartItem{})
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Cart emptied successfully"})
}
