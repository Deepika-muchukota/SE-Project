package tests

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetAllMenuItems(t *testing.T) {
	router := SetupRouter()
	req, _ := http.NewRequest("GET", "/api/all-menu-items", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestGetMenuItemByName(t *testing.T) {
	router := SetupRouter()
	req, _ := http.NewRequest("GET", "/api/menu/item/Iced Coffee With Milk", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}