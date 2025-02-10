package models

import "gorm.io/gorm"

type Restaurant struct {
	gorm.Model
	Name        string `json:"name" gorm:"not null"`
	ImageURL    string `json:"image_url"`
	Description string `json:"description"`
}
