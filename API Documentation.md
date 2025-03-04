# API Documentation 

## List of APIs
#### 1. Signup API (User Registration)
#### 2. Signin API (User Authentication)
#### 3. FetchUser API
#### 4. EditUser API
#### 5. DeleteUser API
####  6. GetFoodStalls API
#### 7. GetFoodMenu API
#### 8. AddItemToCart API
#### 9. FetchCartItems API
#### 10. DeleteItemFromCart API
#### 11. EmptyCart API

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



## Food Stall APIs

### 6. GetFoodStalls API

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

#### Sample Request: 
![fetch_foodstallsapi](https://github.com/user-attachments/assets/655d035c-322b-4e7a-8296-21f2b79694ae)

#### Sample Response: 

![response fetch food](https://github.com/user-attachments/assets/504cc3bc-093e-4323-8003-5d68e0c08faf)

### 7. GetFoodMenu API

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



#### Sample Request: 
![food menu request](https://github.com/user-attachments/assets/ddf07e71-a785-4333-a5d8-d2fe5f5f681d)

#### Sample Response: 

![food menu response](https://github.com/user-attachments/assets/cca1476c-2d67-440d-81f1-c2c29f8d82f2)

## Cart APIs

### 8. AddItemToCart API

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

#### Sample Request: 
![add items cart request](https://github.com/user-attachments/assets/edc032c6-69ac-411d-9ea4-cfed9d0194f9)

#### Sample Response: 
![add items cart response](https://github.com/user-attachments/assets/ae53d565-599a-4fb2-9321-e3657b2196a6)


### 9. FetchCartItems API

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

#### Sample Request: 
![fetch cart req](https://github.com/user-attachments/assets/2c8beaac-7f4c-465f-8edb-f8e19e61b083)

#### Sample Response: 
![fetch cart respo](https://github.com/user-attachments/assets/cc4ec6c4-8724-407c-a7d2-0924487e9c19)


### 10. DeleteItemFromCart API

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

#### Sample Request: 
![delete items req](https://github.com/user-attachments/assets/ddb62768-cde6-48b1-b4f2-551c2cfd3908)

#### Sample Response: 
![delete items respo ](https://github.com/user-attachments/assets/4ab2418e-95a3-479c-8de4-131511df0884)


### 12. EmptyCart API

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

#### Sample Request: 
![empty cart req](https://github.com/user-attachments/assets/2212f2da-5574-4ed9-98ab-64025902ecb1)


#### Sample Response: 

![empty cart respo](https://github.com/user-attachments/assets/8dbade96-ca5f-44a9-853c-b23faf442127)

