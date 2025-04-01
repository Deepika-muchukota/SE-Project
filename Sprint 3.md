# **Sprint 3 Report - UFShopEase**

## **Visual Demo Links**
- [Backend](https://drive.google.com/file/d/1seEFsPlW0_os6lDPXIH_D4IWfbAZlcGR/view?usp=sharing)
- [Frontend](https://drive.google.com/file/d/1CwlLwKJqruN9Ioix2NI7dtYCRrRfKlWY/view?usp=sharing)

## **Sprint 3 Objectives**
In Sprint 3, our team aimed to:
1. Complete pending tasks from Sprint 2.
2. Implement additional APIs for core functionalities.
3. Continue improving integration between frontend and backend.
4. Write comprehensive backend and frontend unit tests.
5. Provide detailed backend API documentation.
6. Submit GitHub repository link and a narrated demo video.

## **Work Completed in Sprint 3**
### **Backend:**
- Implemented **additional API functionalities**:
  - Get All Menu Items
  - Get Menu Item By Name
  - Update Cart Item Quantity
  - Forgot Password
  - Reset Password
- **Database schema finalized**:
  - Tables created: `users`, `foodstalls`, `menu`, `cart`
  - Inserted final food stall and menu data.
- **Integrated frontend and backend** using REST API.
- **Wrote unit tests** for backend functionalities.
- **Updated** backend API documentation.

### **Frontend:**
- **Integrated backend APIs** with the React frontend.
- **Implemented new UI components**:
  - Integrated new cart functionalities (e.g., update quantity).
  - Handled backend integration for menu item search.
  - Frontend unit testing for new workflows.
- **Developed Unit tests** for frontend validation.
- **Wrote unit tests** for individual components.

---

## **Backend API Documentation**

- [API Documentation](https://github.com/Deepika-muchukota/SE-Project/blob/branch/API%20Documentation.md)
  
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
| `/api/all-menu-items` |	`GET` |	Get all menu items. |
| `/api/menu/item/:name` | `GET` | Get menu item by name. |

### **Cart Management**
| **Endpoint** | **Method** | **Description** |
|-------------|-----------|----------------|
| `/api/cart/add` | `POST` | Adds an item to the cart. |
| `/api/cart/:userId` | `GET` | Retrieves cart contents for a user. |
| `/api/cart/delete/:id` | `DELETE` | Deletes a specific item from the cart. |
| `/api/cart/empty/:userId` | `DELETE` | Clears the entire cart for a user. |
| `/api/cart/update/:userId/:menuId` | `PUT` | Update quantity of cart item. |

---

## **Testing**
### **Backend Unit Tests**
The backend was tested using Go's built-in testing package (`testing` and `httptest`). Each API was tested individually.

| **Test Name**                    | **Status** | **Description**                              |
|----------------------------------|------------|----------------------------------------------|
| `TestSignup`                     | ✅ Passed   | Tests user registration.                     |
| `TestSignin`                     | ✅ Passed   | Tests user login.                            |
| `TestFetchUser`                 | ✅ Passed   | Retrieves user details.                      |
| `TestEditUser`                  | ✅ Passed   | Updates user profile.                        |
| `TestDeleteUser`               | ✅ Passed   | Deletes user account.                        |
| `TestGetFoodStalls`            | ✅ Passed   | Fetches all food stalls.                     |
| `TestGetFoodMenu`              | ✅ Passed   | Fetches food menu for a selected stall.      |
| `TestAddItemToCart`            | ✅ Passed   | Adds an item to the user’s cart.             |
| `TestFetchCartItems`           | ✅ Passed   | Retrieves items in the user’s cart.          |
| `TestDeleteItemFromCart`       | ✅ Passed   | Deletes a specific item from the cart.       |
| `TestEmptyCart`                | ✅ Passed   | Empties all items in the user’s cart.        |
| `TestGetAllMenuItems`          | ✅ Passed   | Fetches all menu items from all stalls.      |
| `TestGetMenuItemByName`        | ✅ Passed   | Fetches a menu item by name.                 |
| `TestUpdateCartItemQuantity`   | ✅ Passed   | Updates the quantity of a cart item.         |
| `TestForgotPassword`           | ✅ Passed   | Sends password reset email to the user.      |
| `TestResetPassword`            | ✅ Passed   | Resets user’s password using reset token.    |

| Test File | Test Cases |
|-----------|------------|
| `auth_test.go` | TestSignup, TestSignin, TestFetchUser, TestEditUser, TestDeleteUser, TestForgotPassword, TestResetPassword |
| `cart_test.go` | TestAddItemToCart, TestFetchCartItems, TestDeleteItemFromCart, TestEmptyCart, TestUpdateCartItemQuantity |
| `foodstall_test.go` | TestGetFoodStalls, TestGetFoodMenu |
| `menu_test.go` | TestGetAllMenuItems, TestGetMenuItemByName |

**Example Backend Test (TestUpdateCartItemQuantity API)**
```go
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
```

## **Frontend Unit & Cypress Tests**
Frontend testing was conducted using **Cypress** for UI interactions and **Jest** for component testing.

### **Cypress Tests**
| **Test Name** | **Description** |
|--------------|----------------|
|  | |

### ** Example Cypress Test (Signup)**
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
```

### **Unit Tests**
| **Test Name** | **Description** |
|--------------|----------------|
|  | |

### ** Example Unit Test (Signup)**
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
```
- [**API Documentation**](https://github.com/Deepika-muchukota/SE-Project/blob/branch/API%20Documentation.md)
- [**User Stories**](https://github.com/Deepika-muchukota/SE-Project/issues) can be viewed in Issues tab.
- [**Github Repository**](https://github.com/Deepika-muchukota/SE-Project/tree/branch)

  ## Next Steps (Sprint 4):
- Implement Finalize Order Functionality and payment integration.
- Enhance frontend UI/UX for a better user experience.
- Improve unit test coverage for robustness.
