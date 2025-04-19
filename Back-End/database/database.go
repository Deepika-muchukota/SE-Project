package database

import (
	"SE-Project/Back-End/models"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := "host=localhost user=postgres password=praneeth7073 dbname=ufshopease port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Migrate the schema
	db.AutoMigrate(&models.User{}, &models.FoodStall{}, &models.MenuItem{}, &models.CartItem{})

	DB = db
	log.Println("Database connected successfully!!")
}
