package tests

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestPlaceOrderWithPayment(t *testing.T) {
	router := SetupRouter()

	// Sample request payload
	body := `{
		"user_id": 55,
		"card_details": {
			"number": "9111592350718765",
			"expiry": "12/26",
			"cvv": "465"
		}
	}`

	req, _ := http.NewRequest("POST", "/api/place-order-with-payment", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}
