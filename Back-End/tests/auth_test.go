package tests

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestSignup(t *testing.T) {
	router := SetupRouter()

	body := `{"name": "Test User", "email": "test@example.com", "phone": "1236567890", "password": "Password123"}`
	req, _ := http.NewRequest("POST", "/api/users/signup", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Errorf("Expected status 201 but got %d", w.Code)
	}
}

func TestSignin(t *testing.T) {
	router := SetupRouter()

	body := `{"email": "test@example.com", "password": "Password123"}`
	req, _ := http.NewRequest("POST", "/api/users/signin", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestFetchUser(t *testing.T) {
	router := SetupRouter()
	req, _ := http.NewRequest("GET", "/api/users?name=Test User", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestEditUser(t *testing.T) {
	router := SetupRouter()

	body := `{"name": "Updated User", "email": "test@example.com", "phone": "9876443211"}`
	req, _ := http.NewRequest("PUT", "/api/users/1", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestDeleteUser(t *testing.T) {
	router := SetupRouter()
	req, _ := http.NewRequest("DELETE", "/api/users?email=test@example.com", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}
