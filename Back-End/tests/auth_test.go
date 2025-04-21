package tests

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"
)

var SecretKey = []byte("my_super_secret_key")

func TestSignup(t *testing.T) {
	router := SetupRouter()

	body := `{"name": "SE User6", "email": "seuser6@gmail.com", "phone": "9186664726", "password": "Password@123"}`
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

	body := `{"email": "seuser6@gmail.com", "password": "Password@123"}`
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
	req, _ := http.NewRequest("GET", "/api/users?name=SE User6", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestEditUser(t *testing.T) {
	router := SetupRouter()

	body := `{"name": "SE User6", "email": "seuser6@gmail.com", "phone": "9875447771"}`
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
	req, _ := http.NewRequest("DELETE", "/api/users/15", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestForgotPassword(t *testing.T) {
	router := SetupRouter()

	body := `{"email": "seuser6@gmail.com"}`
	req, _ := http.NewRequest("POST", "/api/users/forgot-password", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

func TestResetPassword(t *testing.T) {
	router := SetupRouter()

	body := `{
		"token": "mocked.jwt.token.here", 
		"new_password": "NewPassword@123"
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

func TestChangeUserPassword(t *testing.T) {
	router := SetupRouter()

	body := `{
		"currentPassword": "Password@123",
		"newPassword": "NewPassword@123"
	}`
	req, _ := http.NewRequest("PUT", "/api/users/53/change-password", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected 200 but got %d", w.Code)
	}
}

func TestUserLogout(t *testing.T) {
	router := SetupRouter()

	body := `{
		"email": "seuser6@gmail.com"
	}`
	req, _ := http.NewRequest("POST", "/api/users/logout", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected 200 but got %d", w.Code)
	}
}
