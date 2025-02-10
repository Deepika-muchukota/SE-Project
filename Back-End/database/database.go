package database

import (
	"log"

	"SE-Project/Back-End/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// Define PostgreSQL connection string
	dsn := "host=localhost user=ufshopease_user password=ufshopease_pwd dbname=ufshopease port=5432 sslmode=disable"

	// Connect to PostgreSQL
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database!")
	}

	// Migrate schema
	db.AutoMigrate(&models.User{}, &models.Restaurant{})

	DB = db
	log.Println("Database connected successfully!")
}
