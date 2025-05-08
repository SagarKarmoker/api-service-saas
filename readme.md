# API Service SaaS

A robust API key management service built with Node.js, Express, and MongoDB. This service allows users to create, manage, and revoke API keys for secure API access.

## Features

- User Authentication
- API Key Generation and Management
- API Key Usage Tracking
- Secure Key Storage
- MongoDB Integration

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- bcryptjs for Password Hashing
- Morgan for Request Logging
- Zod for Validation

## Prerequisites

- Node.js (Latest LTS Version)
- MongoDB Instance
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd api-service-saas
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

```
POST /api/v1/auth - User authentication endpoints
```

### API Key Management

```
POST /api/v1/api/create - Generate new API key
GET /api/v1/api/my-keys - Retrieve user's API keys
DELETE /api/v1/api/delete - Revoke an API key
```

## Security

- JWT-based authentication
- Secure password hashing with bcryptjs
- API key expiration management
- Request logging and monitoring

## Database Schema

### API Key Model

```javascript
{
  userId: ObjectId,
  apiKey: String,
  expairesAt: Date,
  isDeleted: Boolean,
  deletedAt: Date,
  hitCount: Number,
  timestamps: true
}
```

## Error Handling

The application includes a global error handling middleware that processes all errors and returns appropriate HTTP status codes and error messages.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License.