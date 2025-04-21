package models

import (
	"time"
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	ID         uint        `gorm:"primaryKey" json:"id"`
	UserID     uint        `gorm:"not null" json:"user_id"`
	TotalPrice float64     `json:"total_price"`
	Status     string      `json:"status"`
	CreatedAt  time.Time   `json:"created_at"`
	OrderItems []OrderItem `gorm:"foreignKey:OrderID" json:"order_items"`
}
