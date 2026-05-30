# Backend API Documentation

## `POST /users/register`

### Description
Create a new user account by registering with full name, email, and password. The endpoint validates input data and returns a JSON Web Token on successful registration.

### Request URL
`/users/register`

### Request Method
`POST`

### Request Headers
- `Content-Type: application/json`

### Request Body
The request body must be JSON and include the following fields:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "strongpassword"
}
```

### Field Requirements
- `fullname.firstname`: required, minimum 3 characters.
- `fullname.lastname`: required, minimum 3 characters.
- `email`: required, must be a valid email format.
- `password`: required, minimum 6 characters.

### Success Response
- Status: `201 Created`
- Body:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2026-05-29T00:00:00.000Z",
    "updatedAt": "2026-05-29T00:00:00.000Z"
  }
}
```

### Error Responses
- `400 Bad Request`
  - returned when validation fails for email, fullname, or password.
  - response body contains an `errors` array with validation messages.

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Notes
- The returned `token` should be stored client-side and included in future authenticated requests.
- Passwords are hashed before storing in the database.

---

## `POST /users/login`

### Description
Authenticate an existing user by providing email and password. On successful authentication, the endpoint returns a JSON Web Token and user details for accessing protected resources.

### Request URL
`/users/login`

### Request Method
`POST`

### Request Headers
- `Content-Type: application/json`

### Request Body
The request body must be JSON and include the following fields:

```json
{
  "email": "john.doe@example.com",
  "password": "strongpassword"
}
```

### Field Requirements
- `email`: required, must be a valid email format.
- `password`: required, minimum 6 characters.

### Success Response
- Status: `200 OK`
- Body:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2026-05-29T00:00:00.000Z",
    "updatedAt": "2026-05-29T00:00:00.000Z"
  }
}
```

### Error Responses
- `400 Bad Request`
  - Returned when validation fails for email or password format.
  - Response body contains an `errors` array with validation messages.

```json
{
  "errors": [
    {
      "msg": "invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- `401 Unauthorized`
  - Returned when email is not found in the database or password does not match.
  - Response body contains an error message.

```json
{
  "message": "Invalid email or password"
}
```

### Notes
- The returned `token` should be stored client-side and included in future authenticated requests as a Bearer token.
- Credentials are compared securely using password hashing algorithms.
- For security, the exact error message "Invalid email or password" is returned for both incorrect email and incorrect password to prevent user enumeration attacks.
