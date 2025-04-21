package controllers

import (
    "SE-Project/Back-End/database"
    "SE-Project/Back-End/models"
    "github.com/dgrijalva/jwt-go"
    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
    "net/http"
    "time"
    "log"
    "fmt"
)

var SecretKey = []byte("my_super_secret_key")

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

// DeleteUser by ID
func DeleteUserByID(c *gin.Context) {
    id := c.Param("id")

    var user models.User
    if err := database.DB.First(&user, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    if err := database.DB.Delete(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
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

func ChangePassword(c *gin.Context) {
    userID := c.Param("id")
    var req struct {
        CurrentPassword string `json:"currentPassword"`
        NewPassword     string `json:"newPassword"`
    }

    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    var user models.User
    if err := database.DB.First(&user, userID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.CurrentPassword)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Current password is incorrect"})
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
        return
    }

    user.Password = string(hashedPassword)
    if err := database.DB.Save(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update password"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Password updated successfully"})
}

func LogoutUserByEmail(c *gin.Context) {
    var req struct {
        Email string `json:"email"`
    }

    if err := c.ShouldBindJSON(&req); err != nil || req.Email == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
        return
    }

    var user models.User
    if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "message": fmt.Sprintf("User %s logged out successfully", user.Name),
    })
}

// ✅ Generate JWT token for password reset
func generateResetToken(email string) (string, error) {
    claims := jwt.MapClaims{
        "email": email,
        "exp":   time.Now().Add(1 * time.Hour).Unix(),
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString(SecretKey)
}

// ✅ Helper: Validate JWT token
func validateResetToken(tokenStr string) (string, error) {
    token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
        return SecretKey, nil
    })
    if err != nil || !token.Valid {
        return "", err
    }

    claims, ok := token.Claims.(jwt.MapClaims)
    if !ok {
        return "", fmt.Errorf("invalid claims format")
    }

    email, ok := claims["email"].(string)
    if !ok {
        return "", fmt.Errorf("email claim missing or invalid")
    }

    return email, nil
}

// ✅ Forgot Password - Logs reset link to console
func ForgotPassword(c *gin.Context) {
    var req struct {
        Email string `json:"email"`
    }

    if err := c.ShouldBindJSON(&req); err != nil || req.Email == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    var user models.User
    if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    token, err := generateResetToken(user.Email)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create token"})
        return
    }

    resetLink := fmt.Sprintf("http://localhost:3000/reset-password?token=%s", token)
    log.Println("Password reset link:", resetLink) // ← This logs the token URL to console

    c.JSON(http.StatusOK, gin.H{"message": "Reset link generated. Check your console."})
}

// ✅ Reset Password - Accepts token & new password
func ResetPassword(c *gin.Context) {
    var req struct {
        Token       string `json:"token"`
        NewPassword string `json:"new_password"`
    }

    if err := c.ShouldBindJSON(&req); err != nil || req.NewPassword == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    email, err := validateResetToken(req.Token)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired token"})
        return
    }

    var user models.User
    if err := database.DB.Where("email = ?", email).First(&user).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Password encryption failed"})
        return
    }

    user.Password = string(hashedPassword)
    database.DB.Save(&user)

    c.JSON(http.StatusOK, gin.H{"message": "Password reset successful"})
}
