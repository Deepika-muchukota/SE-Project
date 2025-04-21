# **Sprint 4 Final Report - UFShopEase**

## **Visual Demo Links**
- [Backend](https://drive.google.com/file/d/1AMaxu0hJ02DKdz3xJXde1I33_KLIfDr1/view?usp=sharing)
- [Frontend]()

## **Tasks completed for Sprint 4**
In Sprint 4, our primary focus was to:
1. Implement advanced order and user management APIs.
2. Finalize order placement and enable basic payment processing flow.
3. Enhance frontend-backend integration for order summary and history.
4. Strengthen user account management functionality.
5. Extend both backend and frontend test coverage.
6. Improve UI responsiveness and maintainability.
7. Deliver comprehensive documentation and a visual walkthrough.

## **Work Completed in Sprint 4**
### **Backend Enhancements:**
- Implemented **order-related APIs**:
  - Get Single Order Details
  - Get User Order Stats
  - Get Most Recent Order
  - Get Most Ordered Items
  - Place Order
- Implemented **user account management APIs**:
  - Change User Password
  - User Logout
- **Database schema:**:
  - Tables created: `users`, `food_stalls`, `menu_items`, `cart_items`, `order`, `order_items`
- **Added unit tests** for new API endpoints.
- **Updated backend API documentation** and ensured consistent error handling across routes.
- **Integrated** order placement and cart clearing flow post-confirmation.

### **Frontend Enhancements:**
- **Integrated backend APIs** with the React frontend.
- **Integrated PlaceOrder functionality** with backend:
  - Users can now place orders with selected cart items.
  - Orders are stored and reflected in user order history.
- **Added Order Summary** View post-checkout.
- **Built new UI components** for:
  - Password Change
  - Delete Account
- Finalized Logout functionality across the app.
- Continued testing using Jest (unit tests) and Cypress (e2e).
  - Improved test coverage for cart behavior and order flow.
  - Added tests for new components and navigation routes.
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
| `/api/users/change-password/:id` | `PUT` | Change user’s password. |
| `/api/users/logout` | `POST` | Logout user and clear session. |

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

### **Order Management**
| **Endpoint** | **Method** | **Description** |
|-------------|-----------|----------------|
| `/api/orders/:orderId` | `GET` | Get details of a single order. |
| `/api/orders/user/:userId/stats` | `GET` | Get summary of user’s order activity. |
| `/api/orders/user/:userId/recent` |	`GET` |	Get most recent order of the user. |
| `/api/orders/most-ordered-items` | `GET` | Get frequently ordered items across all users. |
| `/api/orders/place`	| `POST` | Place a new order. |

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
| `TestGetSingleOrderDetails`	   | ✅ Passed	 | Fetches a specific order’s information.       |
| `TestGetUserOrderStats`	       | ✅ Passed	 | Returns user-level order stats.               |
| `TestGetMostRecentOrder` 	     | ✅ Passed	 | Gets the last order placed by the user.       |
| `TestGetMostOrderedItems`	     | ✅ Passed	 | Fetches top most frequently ordered items.    |
| `TestPlaceOrder`	             | ✅ Passed	 | Places an order and clears the cart.          |
| `TestChangeUserPassword`	     | ✅ Passed	 | Tests user password change functionality.     |
| `TestUserLogout`	             | ✅ Passed	 | Logs out the user and clears auth data.       |

| Test File | Test Cases |
|-----------|------------|
| `auth_test.go` | TestSignup, TestSignin, TestFetchUser, TestEditUser, TestDeleteUser, TestForgotPassword, TestResetPassword, TestChangeUserPassword, TestUserLogout |
| `cart_test.go` | TestAddItemToCart, TestFetchCartItems, TestDeleteItemFromCart, TestEmptyCart, TestUpdateCartItemQuantity |
| `foodstall_test.go` | TestGetFoodStalls, TestGetFoodMenu |
| `menu_test.go` | TestGetAllMenuItems, TestGetMenuItemByName |
| `order_test.go` | TestGetSingleOrderDetails, TestGetUserOrderStats, TestGetMostRecentOrder, TestGetMostOrderedItems |
| `payment_test.go` | TestPlaceOrderWithPayment |

**Example Backend Test (TestUpdateCartItemQuantity API) (Remaining test cases can be found [here](https://github.com/Deepika-muchukota/SE-Project/tree/branch/Back-End/tests))**
```go
func TestUpdateCartItemQuantity(t *testing.T) {
	router := SetupRouter()

	addBody := `{"user_id": 55, "menu_id": 187, "quantity": 2}`
	addReq, _ := http.NewRequest("POST", "/api/cart/add", bytes.NewBuffer([]byte(addBody)))
	addReq.Header.Set("Content-Type", "application/json")
	addResp := httptest.NewRecorder()
	router.ServeHTTP(addResp, addReq)

	if addResp.Code != http.StatusOK {
		t.Fatalf("Setup failed: could not add item to cart. Status %d", addResp.Code)
	}

	// Now update the quantity
	updateBody := `{"quantity": 5}`
	req, _ := http.NewRequest("PUT", "/api/cart/update/55/187", bytes.NewBuffer([]byte(updateBody)))
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

**Example Cypress Test (Logout): (Remaining test cases can be found [here](https://github.com/Deepika-muchukota/SE-Project/tree/branch/frontend/src))**
```js
describe("Logout Functionality", () => {
    beforeEach(() => {
      // Simulate a logged-in state
      cy.window().then((win) => {
        win.localStorage.setItem("authToken", "test-token"); // Mock auth token
      });
  
      // Visit the Food Stalls page (assuming user is logged in)
      cy.visit("http://localhost:3000/foodstalls");
    });
  
    it("should log out and redirect to Sign In page", () => {
      // Ensure we're on the Food Stalls page
      cy.url().should("include", "/foodstalls");
  
      // Click the Logout button (update selector based on your actual button class or ID)
      cy.get(".logout-btn").click(); 
  
      // Verify redirection to Sign In page
      cy.url().should("include", "/signin");
  
      // Check if Sign In heading is visible
      cy.get("h2").should("contain", "Sign In");
    });
```
**Example Unit Test (Quantity Indicators) (Remaining test cases can be found [here](https://github.com/Deepika-muchukota/SE-Project/tree/branch/frontend/src))**
```js
  test("increments and decrements item quantity correctly", () => {
    render(<Chicken cart={{}} addItemToCart={mockAddItemToCart} />);

    const incrementButton = screen.getAllByText("+")[0];
    const decrementButton = screen.getAllByText("-")[0];
    const quantityDisplay = screen.getAllByText("0")[0];

    // Initially, the quantity should be 0
    expect(quantityDisplay.textContent).toBe("0"); 


    // Click the "+" button and expect quantity to be 1
    fireEvent.click(incrementButton);
    expect(screen.getAllByText("1")[0]).toBeTruthy();

    // Click the "-" button and expect quantity to be 0 again
    fireEvent.click(decrementButton);
    expect(screen.getAllByText("0")[0]).toBeTruthy();
  });
```
- [**API Documentation**](https://github.com/Deepika-muchukota/SE-Project/blob/branch/API%20Documentation.md)
- [**User Stories**](https://github.com/Deepika-muchukota/SE-Project/issues) can be viewed in Issues tab.
- [**Github Repository**](https://github.com/Deepika-muchukota/SE-Project/tree/branch)

## Key Improvements (Sprint 4):
- Added complete order processing flow from cart to confirmation.
- Supported user personalization via order history and stats.
- Improved API consistency across all modules.
- Strengthened test automation to reduce manual QA.
