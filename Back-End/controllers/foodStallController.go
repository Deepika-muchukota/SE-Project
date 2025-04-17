package controllers

import (
	"SE-Project/Back-End/database"
	"SE-Project/Back-End/models"
	"net/http"

	"github.com/gin-gonic/gin"
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

	c.JSON(http.StatusOK, gin.H{"foodstalls": foodStalls}) // 🔹 Fix JSON key to lowercase
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

// Fetch all menu items across stalls
func GetAllMenuItems(c *gin.Context) {
	var menuItems []models.MenuItem

	result := database.DB.Find(&menuItems)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"menuItems": menuItems})
}

func GetMenuItemByName(c *gin.Context) {
	name := c.Param("name")
	var item models.MenuItem
	if err := database.DB.Where("name = ?", name).First(&item).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Menu item not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"menuItem": item})
}
