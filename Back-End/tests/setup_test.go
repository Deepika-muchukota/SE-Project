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

	// Define all API routes
	r.POST("/api/users/signup", controllers.Signup)
	r.POST("/api/users/signin", controllers.Signin)
	r.GET("/api/users", controllers.GetUserByName)
	r.PUT("/api/users/:id", controllers.EditUser)
	r.DELETE("/api/users", controllers.DeleteUser)

	r.GET("/api/foodstalls", controllers.GetFoodStalls)
	r.GET("/api/foodstalls/:id/menu", controllers.GetFoodMenu)
	r.POST("/api/cart/add", controllers.AddItemToCart)
	r.GET("/api/cart/:userId", controllers.FetchCartItems)
	r.DELETE("/api/cart/delete/:id", controllers.DeleteItemFromCart)
	r.DELETE("/api/cart/empty", controllers.EmptyCart)

	r.GET("/api/all-menu-items", controllers.GetAllMenuItems)
	r.GET("/api/menu/item/:name", controllers.GetMenuItemByName)
	r.PUT("/api/cart/update", controllers.UpdateCartItemQuantity)
	r.POST("/api/users/forgot-password", controllers.ForgotPassword)
	r.POST("/api/users/reset-password", controllers.ResetPassword)

	return r
}
