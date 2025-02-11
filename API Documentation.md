# API Documentation 

## List of APIs
#### 1. Signup API (User Registration)
#### 2. Signin API (User Authentication)
#### 3. FetchUser API
#### 4. EditUser API
#### 5. DeleteUser API

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