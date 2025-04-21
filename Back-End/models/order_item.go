package models

import "gorm.io/gorm"

type OrderItem struct {
	gorm.Model
	ID       uint    `gorm:"primaryKey" json:"id"`
	OrderID  uint    `gorm:"not null" json:"order_id"`
	UserID   uint    `gorm:"not null" json:"user_id"`
	MenuID   uint    `gorm:"not null" json:"menu_id"`
	Name     string  `json:"name"`
	Quantity uint    `json:"quantity"`
	Price    float64 `json:"price"`
}
