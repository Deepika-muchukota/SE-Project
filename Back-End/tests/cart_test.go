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

	// First, add the item to ensure it exists
	addBody := `{"user_id": 50, "menu_id": 188, "quantity": 2}`
	addReq, _ := http.NewRequest("POST", "/api/cart/add", bytes.NewBuffer([]byte(addBody)))
	addReq.Header.Set("Content-Type", "application/json")
	addResp := httptest.NewRecorder()
	router.ServeHTTP(addResp, addReq)

	if addResp.Code != http.StatusOK {
		t.Fatalf("Setup failed: could not add item to cart. Status %d", addResp.Code)
	}

	// Now update the quantity
	updateBody := `{"quantity": 5}`
	req, _ := http.NewRequest("PUT", "/api/cart/update/50/188", bytes.NewBuffer([]byte(updateBody)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}
