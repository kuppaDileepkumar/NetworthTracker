Here is a **`README.md`** file formatted with **"read"** functionality:

---

# CrediKhaata - Networth Tracker

## Project Overview

**CrediKhaata** is a backend service built using **Node.js**, **Express**, and **MongoDB** to help shopkeepers manage customer credit sales (loans), track repayments, and handle overdue alerts.

---

## Table of Contents

* [Technologies Used](#technologies-used)
* [Setup Instructions](#setup-instructions)
* [API Endpoints](#api-endpoints)
* [Deployment](#deployment)
* [Demo](#demo)
* [Contributing](#contributing)
* [License](#license)

---

## Technologies Used

* **Node.js**: JavaScript runtime for building the backend service.
* **Express.js**: Web framework for creating RESTful APIs.
* **MongoDB**: NoSQL database for storing data related to customers, loans, and repayments.
* **JWT (jsonwebtoken)**: Secure user authentication with token-based management.
* **bcryptjs**: Library for hashing passwords for user security.
* **moment.js**: Library for date manipulation (e.g., checking overdue loans).
* **dotenv**: Loading environment variables from `.env` file.

---

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js**: Version 14 or higher
* **MongoDB**: Either a local or MongoDB Atlas connection
* **Postman**: To test API endpoints

### Step-by-Step Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/credikhaata.git
   cd credikhaata
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory with the following contents:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/credikhaata
   JWT_SECRET=your_jwt_secret
   ```

   Replace `your_jwt_secret` with a secure key for JWT signing.

4. **Start the Server**:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000` by default.

---

## API Endpoints

### Authentication

* **POST /api/register**
  Registers a new user.
  **Request Body**:

  ```json
  {
    "username": "shopkeeper123",
    "password": "securePassword"
  }
  ```

* **POST /api/login**
  Logs in a user and returns a JWT token.
  **Request Body**:

  ```json
  {
    "username": "shopkeeper123",
    "password": "securePassword"
  }
  ```

---

### Customer Management

* **POST /api/customers**
  Creates a new customer.
  **Request Body**:

  ```json
  {
    "name": "John Doe",
    "phone": "1234567890",
    "email": "johndoe@example.com"
  }
  ```

* **GET /api/customers**
  Retrieves all customers for the logged-in user.

* **GET /api/customers/\:id**
  Retrieves a specific customer by ID.

* **PUT /api/customers/\:id**
  Updates a customer’s details.

* **DELETE /api/customers/\:id**
  Deletes a customer’s record.

---

### Loan Management

* **POST /api/loans**
  Creates a new loan for a customer.
  **Request Body**:

  ```json
  {
    "customerId": "customerId123",
    "amount": 1000,
    "dueDate": "2025-06-01",
    "status": "pending"
  }
  ```

* **GET /api/loans**
  Retrieves all loans for the logged-in user.
  **Query Params**: `status` (optional filter for loan status)

---

### Repayment Tracking

* **POST /api/repayments**
  Records a repayment for a loan.
  **Request Body**:

  ```json
  {
    "loanId": "loanId123",
    "amount": 500
  }
  ```

---

### Loan Summary & Overdue Alerts

* **GET /api/summary**
  Retrieves loan summary: total loaned, collected, overdue amounts, and average repayment time.

* **GET /api/overdue**
  Retrieves a list of customers with overdue loans.

---

## Deployment

### Deployment on Heroku

1. **Create a Heroku App**:

   * Sign in to [Heroku](https://heroku.com).
   * Create a new app.

2. **Deploy the Code**:

   * Link your GitHub repository to the Heroku app.
   * Configure environment variables on Heroku: `MONGO_URI`, `JWT_SECRET`, etc.

3. **Push and Deploy**:

   * Push the code to GitHub.
   * Deploy it to Heroku.

4. **Test the Application**:

   * Access the deployed app at `https://your-heroku-app.herokuapp.com`.

---

## Demo

To test the API:

1. **Use Postman** to send requests to the endpoints above.
2. **JWT Authentication**: Ensure to include the JWT token in the request headers for protected routes.

   Example of authorization header:

   ```text
   Authorization: Bearer JWT_TOKEN
   ```

---

## Contributing

1. **Fork the Repository**.
2. **Create a Feature Branch**:

   ```bash
   git checkout -b feature/your-feature
   ```
3. **Make Changes** and **Commit**:

   ```bash
   git commit -m 'Add your feature'
   ```
4. **Push** and **Create a Pull Request**.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

### Notes

Feel free to adjust the README further according to the specific implementation or changes you make during development. This structure covers essential sections to help other developers set up, test, and contribute to the project.
#   N e t w o r t h T r a c k e r  
 #   N e t w o r t h T r a c k e r  
 #   N e t w o r t h T r a c k e r  
 #   N e t w o r t h T r a c k e r  
 #   N e t w o r t h T r a c k e r  
 