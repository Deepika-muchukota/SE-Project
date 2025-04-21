# **Sprint 3 Report - UFShopEase**

## **Visual Demo Links**
- [Backend](https://drive.google.com/file/d/1seEFsPlW0_os6lDPXIH_D4IWfbAZlcGR/view?usp=sharing)
- [Frontend](https://drive.google.com/file/d/1CwlLwKJqruN9Ioix2NI7dtYCRrRfKlWY/view?usp=sharing)

## **Sprint 3 Objectives**
In Sprint 3, our team aimed to:
1. Complete pending tasks and new issues found in1 Sprint 2.
2. Implement additional APIs for core functionalities.
3. Continue improving integration between frontend and backend.
4. Write comprehensive backend and frontend unit tests, and cypress tests for frontend.
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
- **Implemented new UI components and Made the Nav Bar fully Functional**:
  - Added + and - buttons for each item to increment and decrement quantity of same type.
  - Added display of quantity of each item selected.
  - Implemented logout functionality.
  - Made the cart functional and integrated the cart with backend
  - Added the Add to Cart Button for each web page
  - Added Display of total number of items in the cart in Nav Bar
- **Developed Unit tests** for frontend validation.
  - tested whether components are correctly rendered for all food stall items
  - tested whether increments and decrements quantity of items are done correctly for all food stalls
  - tested whether 'Add to Cart' button  is displayed when items are selected for all food stalls
  - tested whether it updates cart state on confirm order for all food stall items
  - tested whether all food stalls are rendered correctly
  - tested whether it is routed properly  when Starbucks button is clicked
  - tested whether it is routed properly  when Burger 352 button is clicked
- **Wrote cypress tests**
  - tested sigin page
  - tested signup page
  - tested if user is directed to foodstalls page on successful signin
  - tested logout functionality
  - tested Burger foodstall (similarly to other foodstalls)  buttons navigation
  - tested quantity indicators

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

**Example Backend Test (TestUpdateCartItemQuantity API) (Remaining test cases can be found [here](https://github.com/Deepika-muchukota/SE-Project/tree/branch/Back-End/tests))**
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

  ## Next Steps (Sprint 4):
- Implement Finalize Order Functionality (to display order summary) and payment integration.
- Enhance frontend UI/UX for a better user experience.
- Improve unit test coverage for robustness.
