# Campus Food Ordering System API Documentation

## List of APIs
#### 1. Signup API (User Registration)
#### 2. Signin API (User Authentication)
#### 3. FetchUser API
#### 4. EditUser API
#### 5. DeleteUser API
#### 6. GetFoodStalls API
#### 7. GetFoodMenu API
#### 8. AddItemToCart API
#### 9. FetchCartItems API
#### 10. DeleteItemFromCart API
#### 11. EmptyCart API
#### 12. GetAllMenuItems API
#### 13. GetMenuItemByName API
#### 14. UpdateCartItemQuantity API
#### 15. Forgot Password API
#### 16. Reset Password API
#### 17. GetSingleOrderDetails API
#### 18. GetUserOrderStats API
#### 19. GetMostRecentOrder API
#### 20. GetMostOrderedItems API
#### 21. PlaceOrder API
#### 22. ChangeUserPassword API
#### 23. UserLogOut API

## User Management APIs

### 1. Signup API (User Registration): 
#### Request Method:  
POST
#### URL:  
localhost:5000/api/users/signin
#### Functionality:  
Signup API creates a new user account during registration.
#### Sample Request:
![Signup API (User Registration) Request](https://github.com/user-attachments/assets/6945b445-95c2-4302-a18e-5698f8c51c6c)  
#### Sample Response:  
![Signup API (User Registration) Response](https://github.com/user-attachments/assets/bc09438c-57fc-46ff-a83c-f80c4054b954)  
#### Users Table:  
![Signup API (User Registration) DB Update](https://github.com/user-attachments/assets/e82c68b1-b19d-434e-a55c-9e106953715d) 

### 2. Signin API (User Authentication): 
#### Request Method:  
POST
#### URL:  
localhost:5000/api/users/signin
#### Functionality:  
Signin API authenticates a user and returns a JWT token.
#### Sample Request:  
![Signin API (User Authentication) Request](https://github.com/user-attachments/assets/ad0b8ab9-78ed-4723-b18f-86d1adcba80c)
#### Sample Response:  
![Signin API (User Authentication) Response](https://github.com/user-attachments/assets/59b1a504-f8fb-4311-876a-94c8548605d7) 

### 3. FetchUser API: 
#### Request Method:  
GET
#### URL:  
localhost:5000/api/users?name={username}
#### Functionality:  
FetchUser API fetches user details based on their username
#### Sample Request/Response:  
![FetchUser API Request, Response](https://github.com/user-attachments/assets/d1f4b5a6-05af-4961-a0c3-a7e9831b11cf) 

### 4. EditUser API: 
#### Request Method:  
PUT
#### URL:  
localhost:5000/api/users/:id
#### Functionality:  
EditUser API updates user details like name, email, phone number, or password.
#### Sample Request:
![EditUser API Request](https://github.com/user-attachments/assets/3223ddb6-32e8-4b97-b20a-c03dd9cfbd35)
#### Sample Response:
![EditUser API Response](https://github.com/user-attachments/assets/2a2d1851-fbb8-4218-90af-8df20e44dac2)
#### Users Table:
![EditUser API DB Update](https://github.com/user-attachments/assets/84e98ba9-1ab1-4cfa-a7e0-7deecd575f78)

### 5. DeleteUser API
#### Request Method:  
DELETE
#### URL:  
localhost:5000/api/users?name={username}
#### Functionality:  
DeleteUser API deletes a user account based on their name.
#### Sample Request/Response:  
![DeleteUser API Request, Response](https://github.com/user-attachments/assets/b7838d8a-6dc8-409f-84c7-c9d0901b2abd)
#### Users Table:
![DeleteUser API DB Update](https://github.com/user-attachments/assets/77d42940-9135-4786-9466-05dcc1eb2f7a)

### 22. ChangeUserPassword API
#### Request Method:
PUT
#### URL:
localhost:5000/api/users/:UserID/change-password
#### Functionality:
ChangeUserPassword API allows user to update account's password.
#### URL Parameters:
- UserID: ID of the user whose password is being changed
#### Request Body:
```json
{
  "current_password": "oldPassword123",
  "new_password": "newSecurePassword456"
}
```
#### Response:
```json
{
  "message": "Password changed successfully"
}
```
#### Status Codes:
- 200 OK: Password changed successfully
- 400 Bad Request: Invalid input data or new password does not meet requirements
- 401 Unauthorized: Current password is incorrect
- 500 Internal Server Error: Server error during password change
#### Sample Request:
![22_Request](https://github.com/user-attachments/assets/bc9ea77c-1db9-4fe1-b533-52258a508a8f)

#### Sample Response:
![22_Response](https://github.com/user-attachments/assets/878569bc-da07-442f-9111-fdf6bec4da55)

### 23. UserLogOut API
#### Request Method:
POST
#### URL:
localhost:5000/api/users/logout
#### Functionality:
UserLogOut API allows user to logout.
#### Request Body:
```json
{
  "user_id": 12,
  "token": "current-auth-token"
}
```
#### Response:
```json
{
  "message": "User logged out successfully"
}
```
#### Status Codes:
- 200 OK: User logged out successfully
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Invalid token
- 500 Internal Server Error: Server error during logout
#### Sample Request:
![23_Request](https://github.com/user-attachments/assets/7fd5ca40-0c87-4262-8832-d83490993f60)

#### Sample Response:
![23_Response](https://github.com/user-attachments/assets/bf4d4f74-9aea-4593-8998-a18ff6e39d9b)

## Food Stall APIs

### 6. GetFoodStalls API
#### Request Method:
GET
#### URL:
localhost:5000/api/foodstalls
#### Functionality:
Retrieves a list of all available food stalls/vendors
#### Response:
```json
{
  "foodstalls": [
    {
      "id": 1,
      "name": "Taco Place",
      "location": "Student Union North"
    },
    {
      "id": 2,
      "name": "Pizza Corner",
      "location": "Library West"
    }
  ]
}
```
#### Status Codes:
- 200 OK: Successfully retrieved food stalls (returns a message if no stalls found)
- 500 Internal Server Error: Server error during retrieval
#### Sample Request: 
![fetch_foodstallsapi](https://github.com/user-attachments/assets/655d035c-322b-4e7a-8296-21f2b79694ae)
#### Sample Response: 
![response fetch food](https://github.com/user-attachments/assets/504cc3bc-093e-4323-8003-5d68e0c08faf)

### 7. GetFoodMenu API
#### Request Method:
GET
#### URL:
localhost:5000/api/foodstalls/:id/menu
#### Functionality:
Retrieves the menu items for a specific food stall
#### URL Parameters:
- id: Food stall ID
#### Response:
```json
{
  "menu": [
    {
      "id": 1,
      "food_stall_id": 1,
      "name": "Chicken Taco",
      "price": 3.99
    },
    {
      "id": 2,
      "food_stall_id": 1,
      "name": "Beef Burrito",
      "price": 5.99
    }
  ]
}
```
#### Status Codes:
- 200 OK: Successfully retrieved menu items
- 500 Internal Server Error: Server error during retrieval
#### Sample Request: 
![food menu request](https://github.com/user-attachments/assets/ddf07e71-a785-4333-a5d8-d2fe5f5f681d)
#### Sample Response: 
![food menu response](https://github.com/user-attachments/assets/cca1476c-2d67-440d-81f1-c2c29f8d82f2)

### 12. GetAllMenuItems API
#### Request Method:
GET
#### URL:
localhost:5000/api/all-menu-items
#### Functionality:
Fetches a list of all menu items from every food stall available in the system. Useful for search functionality or showing a combined view.
#### Response:
```json
{
  "menuItems": [
    {
      "id": 1,
      "food_stall_id": 1,
      "name": "Chicken Taco",
      "price": 3.99,
      "stall_name": "Taco Place"
    },
    {
      "id": 2,
      "food_stall_id": 1,
      "name": "Beef Burrito",
      "price": 5.99,
      "stall_name": "Taco Place"
    },
    {
      "id": 3,
      "food_stall_id": 2,
      "name": "Pepperoni Pizza",
      "price": 4.99,
      "stall_name": "Pizza Corner"
    }
  ]
}
```
#### Status Codes:
- 200 OK: Successfully retrieved all menu items
- 500 Internal Server Error: Server error during retrieval
#### Sample Request: 
![request_12](https://github.com/user-attachments/assets/0cacb81b-e167-4b1a-ab94-62643365bf9f)
#### Sample Response: 
![response_12](https://github.com/user-attachments/assets/722a48ad-a054-4f09-93e7-6300aade99a1)

### 13. GetMenuItemByName API
#### Request Method:
GET
#### URL:
localhost:5000/api/menu/item/{item_name}
#### Functionality:
Returns the menu item details (name, price, food stall id, etc.) based on the provided name. Useful for item-based lookups or recommendations.
#### URL Parameters:
- item_name: Name of the menu item to search for
#### Response:
```json
{
  "menuItem": {
    "id": 4,
    "food_stall_id": 2,
    "name": "Iced Coffee With Milk",
    "price": 2.99,
    "stall_name": "Coffee Shop"
  }
}
```
#### Status Codes:
- 200 OK: Successfully retrieved menu item
- 404 Not Found: Menu item not found
- 500 Internal Server Error: Server error during retrieval
#### Sample Request: 
![request_13](https://github.com/user-attachments/assets/2c3373e4-db7b-49a6-a1fd-172c341019b3)
#### Sample Response: 
![response_13](https://github.com/user-attachments/assets/ed9a32e8-eacb-4988-89dd-60b6e02e812f)

### 20. GetMostOrderedItems API
#### Request Method:
GET
#### URL:
localhost:5000/api/menu/popular-items
#### Functionality:
Return a list of top 5 most frequently ordered items.
#### Response:
```json
{
  "popular_items": [
    {
      "id": 3,
      "name": "Pepperoni Pizza",
      "food_stall_id": 2,
      "stall_name": "Pizza Corner",
      "price": 4.99,
      "order_count": 156
    },
    {
      "id": 1,
      "name": "Chicken Taco",
      "food_stall_id": 1,
      "stall_name": "Taco Place",
      "price": 3.99,
      "order_count": 142
    },
    {
      "id": 5,
      "name": "Iced Coffee With Milk",
      "food_stall_id": 3,
      "stall_name": "Coffee Shop",
      "price": 2.99,
      "order_count": 118
    },
    {
      "id": 8,
      "name": "Cheeseburger",
      "food_stall_id": 4,
      "stall_name": "Burger Joint",
      "price": 5.49,
      "order_count": 97
    },
    {
      "id": 12,
      "name": "French Fries",
      "food_stall_id": 4,
      "stall_name": "Burger Joint",
      "price": 2.49,
      "order_count": 85
    }
  ]
}
```
#### Status Codes:
- 200 OK: Successfully retrieved popular items
- 500 Internal Server Error: Server error during retrieval
#### Sample Request:
![20_Request](https://github.com/user-attachments/assets/9c855fa3-677b-4196-839b-2ea208cce878)

#### Sample Response:
![20_Response](https://github.com/user-attachments/assets/6740eef9-f825-446b-b365-f1739483b83f)


## Cart APIs

### 8. AddItemToCart API
#### Request Method:
POST
#### URL:
localhost:5000/api/cart/add
#### Functionality:
Adds an item to a user's shopping cart
#### Request Body:
```json
{
  "user_id": 1,
  "menu_id": 2,
  "quantity": 3
}
```
#### Response:
```json
{
  "message": "Item added to cart",
  "cartItem": {
    "id": 1,
    "user_id": 1,
    "menu_id": 2,
    "quantity": 3
  }
}
```
#### Status Codes:
- 200 OK: Item added successfully
- 400 Bad Request: Invalid input data
- 500 Internal Server Error: Server error during addition
#### Sample Request: 
![add items cart request](https://github.com/user-attachments/assets/edc032c6-69ac-411d-9ea4-cfed9d0194f9)
#### Sample Response: 
![add items cart response](https://github.com/user-attachments/assets/ae53d565-599a-4fb2-9321-e3657b2196a6)

### 9. FetchCartItems API
#### Request Method:
GET
#### URL:
localhost:5000/api/cart/:userId
#### Functionality:
Retrieves all items in a specific user's cart
#### URL Parameters:
- userId: User ID whose cart items to retrieve
#### Response:
```json
{
  "cartItems": [
    {
      "id": 1,
      "user_id": 1,
      "menu_id": 2,
      "quantity": 3
    },
    {
      "id": 2,
      "user_id": 1,
      "menu_id": 5,
      "quantity": 1
    }
  ]
}
```
#### Status Codes:
- 200 OK: Successfully retrieved cart items
- 500 Internal Server Error: Server error during retrieval
#### Sample Request: 
![fetch cart req](https://github.com/user-attachments/assets/2c8beaac-7f4c-465f-8edb-f8e19e61b083)
#### Sample Response: 
![fetch cart respo](https://github.com/user-attachments/assets/cc4ec6c4-8724-407c-a7d2-0924487e9c19)

### 10. DeleteItemFromCart API
#### Request Method:
DELETE
#### URL:
localhost:5000/api/cart/delete/:id
#### Functionality:
Removes a specific item from a user's cart
#### URL Parameters:
- id: Cart item ID to delete
#### Response:
```json
{
  "message": "Item deleted from cart"
}
```
#### Status Codes:
- 200 OK: Item deleted successfully
- 500 Internal Server Error: Server error during deletion
#### Sample Request: 
![delete items req](https://github.com/user-attachments/assets/ddb62768-cde6-48b1-b4f2-551c2cfd3908)
#### Sample Response: 
![delete items respo ](https://github.com/user-attachments/assets/4ab2418e-95a3-479c-8de4-131511df0884)

### 11. EmptyCart API
#### Request Method:
DELETE
#### URL:
localhost:5000/api/cart/empty/:userId
#### Functionality:
Removes all items from a specific user's cart
#### URL Parameters:
- userId: User ID whose cart should be emptied
#### Response:
```json
{
  "message": "Cart emptied successfully"
}
```
#### Status Codes:
- 200 OK: Cart emptied successfully
- 500 Internal Server Error: Server error during emptying
#### Sample Request: 
![empty cart req](https://github.com/user-attachments/assets/2212f2da-5574-4ed9-98ab-64025902ecb1)
#### Sample Response: 
![empty cart respo](https://github.com/user-attachments/assets/8dbade96-ca5f-44a9-853c-b23faf442127)

### 14. UpdateCartItemQuantity API
#### Request Method:
PUT
#### URL:
localhost:5000/api/cart/:user_id/:menu_id
#### Functionality:
Updates the quantity of an item already present in the user's cart.
#### URL Parameters:
- user_id: ID of the user whose cart contains the item
- menu_id: ID of the menu item to update
#### Request Body:
```json
{
  "quantity": 5
}
```
#### Response:
```json
{
  "message": "Cart item quantity updated",
  "cartItem": {
    "id": 1,
    "user_id": 1,
    "menu_id": 2,
    "quantity": 5
  }
}
```
#### Status Codes:
- 200 OK: Item quantity updated successfully
- 404 Not Found: Cart item not found
- 400 Bad Request: Invalid input data
- 500 Internal Server Error: Server error during update
#### Sample Request: 
![request_14](https://github.com/user-attachments/assets/df388e66-d098-4424-ab63-8196c41f56a1)
#### Sample Response: 
![response_14](https://github.com/user-attachments/assets/cb31755d-ac71-4ada-b3fa-8f666c88fc62)

## Order APIs

### 17. GetSingleOrderDetails API
#### Request Method:
GET
#### URL:
localhost:5000/api/orders/:UserID/:OrderID
#### Functionality:
Fetch and return details of a specific order placed by a particular user based on order ID.
#### URL Parameters:
- UserID: ID of the user who placed the order
- OrderID: ID of the specific order to retrieve
#### Response:
```json
{
  "order": {
    "id": 45,
    "user_id": 12,
    "total_amount": 35.97,
    "status": "delivered",
    "created_at": "2025-04-18T14:30:22Z",
    "items": [
      {
        "menu_item_id": 3,
        "name": "Pepperoni Pizza",
        "quantity": 2,
        "price": 12.99,
        "subtotal": 25.98
      },
      {
        "menu_item_id": 7,
        "name": "Garden Salad",
        "quantity": 1,
        "price": 9.99,
        "subtotal": 9.99
      }
    ]
  }
}
```
#### Status Codes:
- 200 OK: Successfully retrieved order details
- 404 Not Found: Order not found
- 403 Forbidden: User not authorized to access this order
- 500 Internal Server Error: Server error during retrieval
#### Sample Request:
![17_Request](https://github.com/user-attachments/assets/2a81277c-d120-41a6-af1b-1520e661ffe1)

#### Sample Response:
![17_Response](https://github.com/user-attachments/assets/ae2d6282-efa0-48c6-93a7-34d640d6b028)


### 18. GetUserOrderStats API
#### Request Method:
GET
#### URL:
localhost:5000/api/stats/user/:id
#### Functionality:
Return summary stats: total items, orders, and total spent.
#### URL Parameters:
- id: User ID to retrieve statistics for
#### Response:
```json
{
  "stats": {
    "total_orders": 12,
    "total_items_ordered": 47,
    "total_spent": 285.43,
    "average_order_value": 23.79,
    "most_ordered_item": "Chicken Taco"
  }
}
```
#### Status Codes:
- 200 OK: Successfully retrieved user stats
- 404 Not Found: User not found
- 500 Internal Server Error: Server error during retrieval
#### Sample Request:
![18_Request](https://github.com/user-attachments/assets/598f2e5b-a7b1-4c1c-b42f-0a29052bf870)

#### Sample Response:
![18_Response](https://github.com/user-attachments/assets/4211e325-3eb1-4839-8fac-ef0361bd63d4)


### 19. GetMostRecentOrder API
#### Request Method:
GET
#### URL:
localhost:5000/api/orders/:UserID/latest
#### Functionality:
Fetch and return the latest order for a user.
#### URL Parameters:
- UserID: ID of the user whose latest order to retrieve
#### Response:
```json
{
  "order": {
    "id": 67,
    "user_id": 12,
    "total_amount": 18.50,
    "status": "processing",
    "created_at": "2025-04-20T09:15:44Z",
    "items": [
      {
        "menu_item_id": 5,
        "name": "Iced Coffee With Milk",
        "quantity": 2,
        "price": 2.99,
        "subtotal": 5.98
      },
      {
        "menu_item_id": 9,
        "name": "Breakfast Burrito",
        "quantity": 1,
        "price": 12.52,
        "subtotal": 12.52
      }
    ]
  }
}
```
#### Status Codes:
- 200 OK: Successfully retrieved latest order
- 404 Not Found: No orders found for user
- 500 Internal Server Error: Server error during retrieval
#### Sample Request:
![19_Request](https://github.com/user-attachments/assets/5b6770ff-7dee-4534-8a90-9b0920c0aaea)

#### Sample Response:
![19_Response](https://github.com/user-attachments/assets/da88acd2-0d50-4792-b08b-4d5d7a764c96)


### 21. PlaceOrder API
#### Request Method:
POST
#### URL:
localhost:5000/api/orders/place-with-payment
#### Functionality:
Create a new order: Validate cart, Calculate total, Store order + items, and Make payment.
#### Request Body:
```json
{
  "user_id": 12,
  "payment_method": "credit_card",
  "payment_details": {
    "card_number": "************4242",
    "expiry_date": "12/25",
    "cvv": "***"
  },
  "delivery_address": {
    "street": "123 College Ave",
    "building": "Dorm 4B",
    "city": "University City",
    "zipcode": "12345"
  }
}
```
#### Response:
```json
{
  "message": "Order placed successfully",
  "order": {
    "id": 68,
    "user_id": 12,
    "total_amount": 22.47,
    "status": "processing",
    "created_at": "2025-04-21T10:25:36Z",
    "payment_status": "completed",
    "estimated_delivery": "2025-04-21T11:00:00Z"
  }
}
```
#### Status Codes:
- 201 Created: Order placed successfully
- 400 Bad Request: Invalid input or empty cart
- 402 Payment Required: Payment failed
- 500 Internal Server Error: Server error during order placement
#### Sample Request:
![21_Request](https://github.com/user-attachments/assets/23daad72-225d-4aac-94b4-8ef72058d5fb)

#### Sample Response:
![21_Response](https://github.com/user-attachments/assets/f0116484-7d06-47ff-a21c-b69647ff6e80)


## Password Management APIs

### 15. Forgot Password API
#### Request Method:
POST
#### URL:
localhost:5000/api/users/forgot-password
#### Functionality:
Sends a password reset link to the user's registered email address. The link contains a token used to verify the user during password reset.
#### Request Body:
```json
{
  "email": "user@example.com"
}
```
#### Response:
```json
{
  "message": "Password reset link sent to your email"
}
```
#### Status Codes:
- 200 OK: Reset link sent successfully
- 404 Not Found: User with the specified email not found
- 500 Internal Server Error: Server error during email sending
#### Sample Request: 
![request_15](https://github.com/user-attachments/assets/ae805f84-93d2-4f85-a98e-6cb1ebb06879)
#### Sample Response: 
![response_15](https://github.com/user-attachments/assets/f7764cf1-6a27-42de-a5fe-8ffda6b27aaa)

### 16. Reset Password API
#### Request Method:
POST
#### URL:
localhost:5000/api/users/reset-password
#### Functionality:
Resets the password of the user associated with the provided token. The token is verified and the password is securely updated in the database.
#### Request Body:
```json
{
  "token": "reset-token-from-email",
  "password": "newPassword123"
}
```
#### Response:
```json
{
  "message": "Password reset successful"
}
```
#### Status Codes:
- 200 OK: Password reset successful
- 400 Bad Request: Invalid or expired token
- 500 Internal Server Error: Server error during password reset
#### Sample Request: 
![request_16](https://github.com/user-attachments/assets/4239ab2b-2e90-40bb-a244-ed2d4ab33275)
#### Sample Response:
![response_16](https://github.com/user-attachments/assets/9bfe5388-f80a-4ae3-8ebf-759b99f48729)
