package controllers

import (
	"SE-Project/Back-End/database"
	"SE-Project/Back-End/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetRestaurants(c *gin.Context) {
	var restaurants []models.Restaurant
	database.DB.Find(&restaurants)

	c.JSON(http.StatusOK, gin.H{"restaurants": restaurants})
}
