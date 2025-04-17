package main

import (
	"SE-Project/Back-End/controllers"
	"SE-Project/Back-End/database"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to the database
	database.ConnectDB()

	// Create a new Gin router
	r := gin.Default()

	// Enable CORS
	r.Use(cors.Default())

	// Authentication Routes
	r.POST("/api/users/signup", controllers.Signup)
	r.POST("/api/users/signin", controllers.Signin)
	r.GET("/api/users", controllers.GetUserByName)
	r.PUT("/api/users/:id", controllers.EditUser)
	r.DELETE("/api/users", controllers.DeleteUser)

	// Food Stalls & Menu Routes
	r.GET("/api/foodstalls", controllers.GetFoodStalls)
	r.GET("/api/foodstalls/:id/menu", controllers.GetFoodMenu)
	r.GET("/api/all-menu-items", controllers.GetAllMenuItems)
	r.GET("/api/menu/item/:name", controllers.GetMenuItemByName)

	// Cart Routes
	r.POST("/api/cart/add", controllers.AddItemToCart)
	r.GET("/api/cart/:userId", controllers.FetchCartItems)
	r.DELETE("/api/cart/delete/:userId/:menuId", controllers.DeleteItemFromCart)
	r.DELETE("/api/cart/empty/:userId", controllers.EmptyCart)

	// Start the server on port 5000
	r.Run(":5000")
}

