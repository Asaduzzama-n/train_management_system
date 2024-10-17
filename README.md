# Train Management System Backend API Documentation

This is the documentation for the Train Management System Backend API, which allows you to manage users, trains, stations, and train stops.

## Postman Documentation

[You can find detailed documentation for the API endpoints and usage in the Postman collection](https://documenter.getpostman.com/view/27802886/2sAXxV6qGk)

## Table of Contents

```javascript
Project Overview
Installation
Environment Setup
API Endpoints
Auth
User
Station
Train
Stops
Wallet
Ticket
How to Run
License
Middleware for Authentication and Authorization for API
```

# Project Overview

The Train Management System Backend API provides a RESTful interface to manage users, trains, stations, and stops. It includes authentication for both users and admins and supports CRUD operations for managing the train-related data.

# Installation

**Clone the repository:**

`git clone git@github.com:Asaduzzama-n/train_management_system.git`

> cd train_management_system

## Install dependencies:

    npm install

## Environment Setup

**Create a .env file in the root of your project and add the following variables:**

```javascript
NODE_ENV=development
PORT=5000
DATABASE_URL=<your-database-url>

BCRYPT_SALT_ROUNDS=12
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET=<your-jwt-refresh-secret>
JWT_REFRESH_EXPIRES_IN=7d
```

> Ensure you have a valid DATABASE_URL for connecting to your database.

**Middleware for Authentication and Authorization for API**

> Ensure to add Authorization header with Access Token.

## API Endpoints

```javascript
Auth
Create User - POST /api/v1/auth/signup
Login - POST /api/v1/auth/login
Get Refresh Token - POST /api/v1/auth/refresh-token

User

Get All Users - GET /api/v1/user
Get Single User - GET /api/v1/user/:id
Update User - PATCH /api/v1/user/:id
Delete User - DELETE /api/v1/user/:id

Station

Get All Stations - GET /api/v1/station
Create Station - POST /api/v1/station
Get Single Station - GET /api/v1/station/:id
Update Station - PATCH /api/v1/station/:id
Delete Station - DELETE /api/v1/station/:id

Train

Get All Trains - GET /api/v1/train
Create Train - POST /api/v1/train
Get Single Train - GET /api/v1/train/:id
Update Train - PATCH /api/v1/train/:id
Delete Train - DELETE /api/v1/train/:id
Add Train Stops - PATCH /api/v1/train/add-stops/:trainId

Stops

Get All Stops - GET /api/v1/stop
Create Stop - POST /api/v1/stop
Get Single Stop - GET /api/v1/stop/:id
Update Stop - PATCH /api/v1/stop/:id
Delete Stop - DELETE /api/v1/stop/:id
```

# How to Run

> Ensure your .env file is set up properly.

Start the server:

`npm start`

**The API will be available at http://localhost:5000/.**

# License

This project is licensed under the MIT License. See the LICENSE file for more details.

Make sure to replace placeholder links (e.g., Postman documentation) and values in the .env setup with actual values specific to your project.

Copyright
© 2024 Asaduzzaman. All rights reserved.
