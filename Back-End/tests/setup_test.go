package tests

import (
	"SE-Project/Back-End/controllers"
	"SE-Project/Back-End/database"
	"github.com/gin-gonic/gin"
)

// SetupRouter initializes the router for testing
func SetupRouter() *gin.Engine {
	database.ConnectDB() // Ensure the database is connected

	r := gin.Default()

	// Authentication Routes
	r.POST("/api/users/signup", controllers.Signup)
	r.POST("/api/users/signin", controllers.Signin)
	r.GET("/api/users", controllers.GetUserByName)
	r.PUT("/api/users/:id", controllers.EditUser)
	r.DELETE("/api/users/:id", controllers.DeleteUserByID)
	r.PUT("/api/users/:id/change-password", controllers.ChangePassword)
	r.POST("/api/users/logout", controllers.LogoutUserByEmail)
	r.POST("/api/users/forgot-password", controllers.ForgotPassword)
	r.POST("/api/users/reset-password", controllers.ResetPassword)

	// Food Stalls & Menu Routes
	r.GET("/api/foodstalls", controllers.GetFoodStalls)
	r.GET("/api/foodstalls/:id/menu", controllers.GetFoodMenu)
	r.GET("/api/all-menu-items", controllers.GetAllMenuItems)
	r.GET("/api/menu/item/:name", controllers.GetMenuItemByName)

	// Cart Routes
	r.POST("/api/cart/add", controllers.AddItemToCart)
	r.GET("/api/cart/:userId", controllers.FetchCartItems)
	r.DELETE("/api/cart/delete/:userId/:menuId", controllers.DeleteItemFromCart)
	r.PUT("/api/cart/update/:userId/:menuId", controllers.UpdateCartItemQuantity)
	r.DELETE("/api/cart/empty/:userId", controllers.EmptyCart)

	// Order Routes
	r.GET("/api/orders/:userId/:orderId", controllers.GetSingleOrderDetails)
	r.GET("/api/stats/user/:userId", controllers.GetUserOrderStats)
	r.GET("/api/orders/:userId/latest", controllers.GetMostRecentOrder)
	r.GET("/api/menu/popular-items", controllers.GetMostOrderedItems)

	r.POST("/api/place-order/:userId", controllers.FinalizeOrder)
	r.GET("/api/orders/:userId", controllers.GetOrdersByUser)

	// Payment Routes
	r.POST("/api/payments", controllers.HandlePayment)
	r.POST("/api/orders/place-with-payment", controllers.PlaceOrderWithPayment)

	return r
}
