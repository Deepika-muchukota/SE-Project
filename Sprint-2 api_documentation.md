# UF Shop Ease API Documentation

## Sprint-2 APIs

This document provides detailed information about the APIs implemented in Sprint-2 for the UF Shop Ease application.

## Food Stall APIs

### 1. GetFoodStalls API

- **Request Method:** GET
- **URL:** `localhost:5000/api/foodstalls`
- **Functionality:** Retrieves a list of all available food stalls/vendors
- **Response:**
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
- **Status Codes:**
  - `200 OK`: Successfully retrieved food stalls (returns a message if no stalls found)
  - `500 Internal Server Error`: Server error during retrieval

### 2. GetFoodMenu API

- **Request Method:** GET
- **URL:** `localhost:5000/api/foodstalls/:id/menu`
- **Functionality:** Retrieves the menu items for a specific food stall
- **URL Parameters:**
  - `id`: Food stall ID
- **Response:**
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
- **Status Codes:**
  - `200 OK`: Successfully retrieved menu items
  - `500 Internal Server Error`: Server error during retrieval

## Cart APIs

### 3. AddItemToCart API

- **Request Method:** POST
- **URL:** `localhost:5000/api/cart/add`
- **Functionality:** Adds an item to a user's shopping cart
- **Request Body:**
  ```json
  {
    "user_id": 1,
    "menu_id": 2,
    "quantity": 3
  }
  ```
- **Response:**
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
- **Status Codes:**
  - `200 OK`: Item added successfully
  - `400 Bad Request`: Invalid input data
  - `500 Internal Server Error`: Server error during addition

### 4. FetchCartItems API

- **Request Method:** GET
- **URL:** `localhost:5000/api/cart/:userId`
- **Functionality:** Retrieves all items in a specific user's cart
- **URL Parameters:**
  - `userId`: User ID whose cart items to retrieve
- **Response:**
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
- **Status Codes:**
  - `200 OK`: Successfully retrieved cart items
  - `500 Internal Server Error`: Server error during retrieval

### 5. DeleteItemFromCart API

- **Request Method:** DELETE
- **URL:** `localhost:5000/api/cart/delete/:id`
- **Functionality:** Removes a specific item from a user's cart
- **URL Parameters:**
  - `id`: Cart item ID to delete
- **Response:**
  ```json
  {
    "message": "Item deleted from cart"
  }
  ```
- **Status Codes:**
  - `200 OK`: Item deleted successfully
  - `500 Internal Server Error`: Server error during deletion

### 6. EmptyCart API

- **Request Method:** DELETE
- **URL:** `localhost:5000/api/cart/empty/:userId`
- **Functionality:** Removes all items from a specific user's cart
- **URL Parameters:**
  - `userId`: User ID whose cart should be emptied
- **Response:**
  ```json
  {
    "message": "Cart emptied successfully"
  }
  ```
- **Status Codes:**
  - `200 OK`: Cart emptied successfully
  - `500 Internal Server Error`: Server error during emptying

