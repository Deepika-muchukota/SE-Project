package models

import "gorm.io/gorm"

type MenuItem struct {
	gorm.Model
	ID          uint    `gorm:"primaryKey" json:"id"`
	FoodStallID uint    `gorm:"not null" json:"food_stall_id"`
	Name        string  `gorm:"not null" json:"name"`
	Price       float64 `gorm:"not null" json:"price"`
}