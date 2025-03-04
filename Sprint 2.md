# **Sprint 2 Report - UFShopEase**

## **Visual Demo Links**
- [Backend]()
- [Frontend]()

## **Sprint 2 Objectives**
In Sprint 2, our team aimed to:
1. Complete pending tasks from Sprint 1.
2. Fully integrate the backend with the frontend.
3. Implement additional APIs for core functionalities.
4. Write and execute unit tests for both frontend and backend.
5. Provide detailed backend API documentation.
6. Submit GitHub repository link and a narrated demo video.

---

## **Work Completed in Sprint 2**
### **Backend**
- Implemented **additional API functionalities**:
  - Logout API
  - Fetch all food stalls
  - Get menu for a specific food stall
  - Add items to cart
  - View cart items
  - Remove item from cart
  - Clear entire cart
- **Database schema finalized**:
  - Tables created: `users`, `foodstalls`, `menu`, `cart`
  - Inserted initial food stall and menu data.
- **Integrated frontend and backend** using REST API.
- **Wrote unit tests** for backend functionalities.
- **API Documentation** added in `Sprint2.md`.

### **Frontend**
- **Integrated backend APIs** with the React frontend.
- **Implemented new UI components**:
  - Food stall listings
  - Menu display for selected food stalls
  - Cart functionality (add, remove, clear)
  - Order summary screen
- **Developed Cypress tests** for frontend validation.
- **Wrote unit tests** for individual components.

---

## **Backend API Documentation**
### **Authentication**
| **Endpoint** | **Method** | **Description** |
|-------------|-----------|----------------|
| `/api/users/signup` | `POST` | Registers a new user. |
| `/api/users/signin` | `POST` | Authenticates a user. |
| `/api/users/logout` | `POST` | Logs out the user. |
| `/api/users/:id` | `GET` | Retrieves user details. |
| `/api/users/:id` | `PUT` | Updates user details. |
| `/api/users/:id` | `DELETE` | Deletes a user. |

### **Food Stalls & Menu**
| **Endpoint** | **Method** | **Description** |
|-------------|-----------|----------------|
| `/api/foodstalls` | `GET` | Fetches all available food stalls. |
| `/api/foodstalls/:id/menu` | `GET` | Retrieves menu items for a specific food stall. |

### **Cart Management**
| **Endpoint** | **Method** | **Description** |
|-------------|-----------|----------------|
| `/api/cart/add` | `POST` | Adds an item to the cart. |
| `/api/cart/:userId` | `GET` | Retrieves cart contents for a user. |
| `/api/cart/delete/:id` | `DELETE` | Deletes a specific item from the cart. |
| `/api/cart/empty/:userId` | `DELETE` | Clears the entire cart for a user. |

---

## **Testing**
### **Backend Unit Tests**
The backend was tested using Go's built-in testing package (`testing` and `httptest`). Each API was tested individually.

| **Test Name** | **Status** | **Description** |
|--------------|-----------|----------------|
| `TestSignup` | ✅ Passed | Tests user registration. |
| `TestSignin` | ✅ Passed | Tests user login. |
| `TestFetchUser` | ✅ Passed | Retrieves user details. |
| `TestEditUser` | ✅ Passed | Updates user profile. |
| `TestDeleteUser` | ✅ Passed | Deletes user account. |
| `TestFetchFoodStalls` | ✅ Passed | Fetches all food stalls. |
| `TestGetFoodMenu` | ✅ Passed | Fetches menu items for a food stall. |
| `TestAddItemsToCart` | ✅ Passed | Adds an item to the cart. |
| `TestFetchCartItems` | ✅ Passed | Retrieves cart contents. |
| `TestDeleteItemFromCart` | ✅ Passed | Removes an item from the cart. |
| `TestEmptyCart` | ✅ Passed | Empties the entire cart. |

**Example Backend Test (Signup API)**
```go
func TestSignup(t *testing.T) {
	router := SetupRouter()

	body := `{"name": "Test User", "email": "test@example.com", "phone": "1234567890", "password": "Password123"}`
	req, _ := http.NewRequest("POST", "/api/users/signup", bytes.NewBuffer([]byte(body)))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Errorf("Expected status 201 but got %d", w.Code)
	}
}

## **Frontend Unit & Cypress Tests**
Frontend testing was conducted using **Cypress** for UI interactions and **Jest** for component testing.

### **Cypress Tests**
| **Test Name** | **Description** |
|--------------|----------------|
| `signup.spec.js` | Tests user signup functionality. |
| `login.spec.js` | Verifies login with valid/invalid credentials. |
| `cart.spec.js` | Adds an item to the cart and verifies it appears. |
| `checkout.spec.js` | Ensures the checkout process works. |

** Example Cypress Test (Signup)**
```js
describe('User Signup', () => {
  it('Should register a new user', () => {
    cy.visit('/signup')
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="phone"]').type('1234567890')
    cy.get('input[name="password"]').type('Password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/signin')
  })
})

## Challenges Faced & Solutions:
| **Challenge** | **Solution** |
| `Database connection issues` | `Fixed by configuring PostgreSQL credentials properly.` |
| `CORS errors between frontend and backend	` | `Implemented correct CORS settings in Gin framework.`|
| `User signup duplicate entry` |	`Implemented unique constraint validation.` |
| `API testing failures` |  `Fixed database setup for consistent test execution.` |


## Next Steps (Sprint 3):
- Implement payment integration.
- Enhance frontend UI/UX for a better user experience.
- Improve unit test coverage for robustness.