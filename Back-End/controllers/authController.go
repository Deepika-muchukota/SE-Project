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
    "log"
    "fmt"
)

var SecretKey = "supersecretkey"

// Signup Handler
func Signup(c *gin.Context) {
    var input models.User

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
        return
    }
    input.Password = string(hashedPassword)

    if err := database.DB.Create(&input).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "User created successfully!", "user": input})
}

// Signin Handler (updated to return user details)
func Signin(c *gin.Context) {
    var input struct {
        Email    string `json:"email"`
        Password string `json:"password"`
    }
    var user models.User

    if err := c.ShouldBindJSON(&input); err != nil {
        log.Println("Failed to bind JSON:", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    log.Println("Signin input received: ", input.Email, input.Password)

    // Check if user exists
    if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
        log.Println("User not found for email:", input.Email)
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
        return
    }

    log.Println("User found. Hashed password in DB:", user.Password)

    // Check password
    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
        log.Println("Password mismatch. Input password:", input.Password)
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
        return
    }

    // Generate JWT token
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "user_id": user.ID,
        "exp":     time.Now().Add(72 * time.Hour).Unix(),
    })
    tokenString, _ := token.SignedString([]byte(SecretKey))

    log.Println("Login successful for:", input.Email)

    c.JSON(http.StatusOK, gin.H{
        "message": "Login successful",
        "token": tokenString,
        "user": gin.H{
            "id":    user.ID,
            "name":  user.Name,
            "email": user.Email,
            "phone": user.Phone,
        },
    })
}

// DeleteUser by ID or Name
func DeleteUser(c *gin.Context) {
    userID := c.Query("id")
    username := c.Query("name")

    var user models.User
    var result *gorm.DB

    if userID != "" {
        result = database.DB.Where("id = ?", userID).Delete(&user)
    } else if username != "" {
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

// Get user by Name
func GetUserByName(c *gin.Context) {
    name := c.Query("name")
    if name == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Name query parameter is required"})
        return
    }

    var user models.User
    result := database.DB.Where("LOWER(name) ILIKE LOWER(?)", name).First(&user)

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

// Edit User by ID
func EditUser(c *gin.Context) {
    userID := c.Param("id")

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
        fmt.Println("Hashed DB password:", user.Password)
    }

    database.DB.Save(&user)

    c.JSON(http.StatusOK, gin.H{"message": "User updated successfully", "user": user})
}
