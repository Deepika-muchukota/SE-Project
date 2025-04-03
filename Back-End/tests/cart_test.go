package tests

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAddItemToCart(t *testing.T) {
	router := SetupRouter()

	body := `{"user_id": 50, "menu_id": 238, "quantity": 2}`
	req, _ := http.NewRequest("POST", "/api/cart/add", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestFetchCartItems(t *testing.T) {
	router := SetupRouter()
	req, _ := http.NewRequest("GET", "/api/cart/50", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestDeleteItemFromCart(t *testing.T) {
	router := SetupRouter()
	req, _ := http.NewRequest("DELETE", "/api/cart/delete/50/238", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestEmptyCart(t *testing.T) {
	router := SetupRouter()
	req, _ := http.NewRequest("DELETE", "/api/cart/empty/50", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestUpdateCartItemQuantity(t *testing.T) {
	router := SetupRouter()

	body := `{"user_id": 50, "menu_id": 238, "quantity": 3}`
	req, _ := http.NewRequest("PUT", "/api/cart/update", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

