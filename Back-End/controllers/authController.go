package controllers

import (
	"SE-Project/Back-End/database"
	"SE-Project/Back-End/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"net/http"
	"time"
)

var SecretKey = "supersecretkey"

func Signup(c *gin.Context) {
	var input models.User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash the password
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	input.Password = string(hashedPassword)

	// Save user to the database
	database.DB.Create(&input)

	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully!"})
}

func Signin(c *gin.Context) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	var user models.User

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find user by email
	database.DB.Where("email = ?", input.Email).First(&user)
	if user.ID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Verify password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(72 * time.Hour).Unix(),
	})

	tokenString, _ := token.SignedString([]byte(SecretKey))

	c.JSON(http.StatusOK, gin.H{"message": "Login successful", "token": tokenString})
}

// DeleteUser - Deletes a user by ID or Name
func DeleteUser(c *gin.Context) {
	userID := c.Query("id")        // Get user ID from query parameters
	username := c.Query("name") // Get name from query parameters

	var user models.User
	var result *gorm.DB

	if userID != "" {
		// Delete by User ID
		result = database.DB.Where("id = ?", userID).Delete(&user)
	} else if username != "" {
		// Delete by Username
		result = database.DB.Where("name = ?", username).Delete(&user)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Provide either user ID or username"})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// GetUserByName - Fetch user details by Name using Query Parameter
func GetUserByName(c *gin.Context) {
	name := c.Query("name") // Get 'name' from query parameters

	if name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name query parameter is required"})
		return
	}

	var user models.User
	result := database.DB.Where("LOWER(name) ILIKE LOWER(?)", name).First(&user) // Case-insensitive search

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":    user.ID,
		"name":  user.Name,
		"email": user.Email,
		"phone": user.Phone,
	})
}

// EditUser - Updates user details by ID
func EditUser(c *gin.Context) {
	userID := c.Param("id") // Extract user ID from URL

	var user models.User
	result := database.DB.First(&user, userID)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	var input struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Phone    string `json:"phone"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update fields if provided
	if input.Name != "" {
		user.Name = input.Name
	}
	if input.Email != "" {
		user.Email = input.Email
	}
	if input.Phone != "" {
		user.Phone = input.Phone
	}
	if input.Password != "" {
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
		user.Password = string(hashedPassword)
	}

	// Save changes to DB
	database.DB.Save(&user)

	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully", "user": user})
}
