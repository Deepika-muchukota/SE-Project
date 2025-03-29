package models

import "gorm.io/gorm"

type CartItem struct {
	gorm.Model
	ID       uint    `gorm:"primaryKey" json:"id"`
	UserID   uint    `gorm:"not null" json:"user_id"`    
	MenuID   uint    `gorm:"not null" json:"menu_id"`    
	Quantity uint    `gorm:"not null" json:"quantity"`
	Name     string  `json:"name"`
	Price    float64 `json:"price"`
}
