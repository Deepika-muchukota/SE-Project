package models

import "gorm.io/gorm"

type FoodStall struct {
	gorm.Model
	ID       uint   `gorm:"primaryKey" json:"id"`
	Name     string `gorm:"not null" json:"name"`
	Location string `json:"location"`
}
