package tests

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetFoodStalls(t *testing.T) {
	router := SetupRouter()
	req, _ := http.NewRequest("GET", "/api/foodstalls", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestGetFoodMenu(t *testing.T) {
	router := SetupRouter()
	req, _ := http.NewRequest("GET", "/api/foodstalls/2/menu", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

