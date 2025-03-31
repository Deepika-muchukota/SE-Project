package tests

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestSignup(t *testing.T) {
	router := SetupRouter()

	body := `{"name": "SE Project User", "email": "seprojectuser@gmail.com", "phone": "9181534726", "password": "Password@123"}`
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

	body := `{"email": "kamalkandula1@gmail.com", "password": "Password@123"}`
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
	req, _ := http.NewRequest("GET", "/api/users?name=Kamal Kandula", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestEditUser(t *testing.T) {
	router := SetupRouter()

	body := `{"name": "Updated User", "email": "kamalkandula1@gmail.com", "phone": "9876443211"}`
	req, _ := http.NewRequest("PUT", "/api/users/43", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestDeleteUser(t *testing.T) {
	router := SetupRouter()
	req, _ := http.NewRequest("DELETE", "/api/users?name=S Iyer", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestForgotPassword(t *testing.T) {
	router := SetupRouter()

	body := `{"email": "kamalkandula1@gmail.com"}`
	req, _ := http.NewRequest("POST", "/api/users/forgot-password", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestResetPassword(t *testing.T) {
	// Ideally you'd mock token generation and DB, for now just basic structure
	router := SetupRouter()

	body := `{
		"token": "mocked.jwt.token.here", 
		"new_password": "NewPassword123"
	}`
	req, _ := http.NewRequest("POST", "/api/users/reset-password", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Assuming 400 due to invalid token
	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 but got %d", w.Code)
	}
}
