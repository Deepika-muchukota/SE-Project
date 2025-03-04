package controllers

import (
	"SE-Project/Back-End/database"
	"SE-Project/Back-End/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Fetch all food stalls
func GetFoodStalls(c *gin.Context) {
	var foodStalls []models.FoodStall
	result := database.DB.Find(&foodStalls)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if len(foodStalls) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "No food stalls found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"foodstalls": foodStalls})  // 🔹 Fix JSON key to lowercase
}

// Fetch menu for a specific food stall
func GetFoodMenu(c *gin.Context) {
	var menu []models.MenuItem
	foodStallID := c.Param("id")

	result := database.DB.Where("food_stall_id = ?", foodStallID).Find(&menu)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"menu": menu})
}
