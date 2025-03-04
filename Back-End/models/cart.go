package models

import "gorm.io/gorm"

type CartItem struct {
	gorm.Model
	ID       uint `gorm:"primaryKey" json:"id"`
	UserID   uint `gorm:"not null" json:"user_id"`
	MenuID   uint `gorm:"not null" json:"menu_id"`
	Quantity uint `gorm:"not null; check:quantity>0" json:"quantity"`
}