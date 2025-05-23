package tests

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetSingleOrderDetails(t *testing.T) {
	router := SetupRouter()

	req, _ := http.NewRequest("GET", "/api/orders/50/13", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected 200 but got %d", w.Code)
	}
}

func TestGetUserOrderStats(t *testing.T) {
	router := SetupRouter()

	req, _ := http.NewRequest("GET", "/api/stats/user/55", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected 200 but got %d", w.Code)
	}
}

func TestGetMostRecentOrder(t *testing.T) {
	router := SetupRouter()

	req, _ := http.NewRequest("GET", "/api/orders/50/latest", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected 200 but got %d", w.Code)
	}
}

func TestGetMostOrderedItems(t *testing.T) {
	router := SetupRouter()

	req, _ := http.NewRequest("GET", "/api/menu/popular-items", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected 200 but got %d", w.Code)
	}
}

