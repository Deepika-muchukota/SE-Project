package main

import (
	"SE-Project/Back-End/controllers"
	"SE-Project/Back-End/database"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to the database
	database.ConnectDatabase()

	// Create a new Gin router
	r := gin.Default()

	// Authentication Routes
	r.POST("/api/users/signup", controllers.Signup)
	r.POST("/api/users/signin", controllers.Signin)
	r.GET("/api/users", controllers.GetUserByName)
	r.PUT("/api/users/:id", controllers.EditUser)
	r.DELETE("/api/users", controllers.DeleteUser)

	// Restaurant Routes
	// r.GET("/api/restaurants", controllers.GetRestaurants)

	// Start the server on port 5000
	r.Run(":5000")
}
