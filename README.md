# Land Management System

A comprehensive land management system built with NestJS to digitize and streamline Rwanda's land administration processes.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Land Officer, Tax Officer, Construction Officer, Citizen)
  - Secure password hashing

- **Land Registration**
  - Digital land registration process
  - Land ownership verification
  - Document management
  - Status tracking

- **Land Transfer**
  - Ownership transfer requests
  - Transfer approval workflow
  - Document verification
  - Transfer history

- **Land Taxes**
  - Tax assessment
  - Payment tracking
  - Penalty calculation
  - Tax history

- **Conflict Resolution**
  - Dispute registration
  - Mediation process
  - Field visit management
  - Resolution tracking

- **Urbanization & Construction**
  - Construction permit applications
  - Plan review process
  - Inspection scheduling
  - Permit tracking

- **System Settings**
  - Configurable tax rates
  - Permit fees management
  - Workflow customization
  - System preferences

## Technology Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: Passport + JWT
- **API Documentation**: Swagger
- **Scheduling**: @nestjs/schedule
- **Validation**: class-validator
- **Type Safety**: TypeScript

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd land-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```env
   PORT=3000

   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=land_management

   # JWT
   JWT_SECRET=your-super-secret-key-here
   JWT_EXPIRES_IN=1d
   ```

4. Create the database:
   ```bash
   createdb land_management
   ```

## Running the Application

1. Development mode:
   ```bash
   npm run start:dev
   ```

2. Production mode:
   ```bash
   npm run build
   npm run start:prod
   ```

The application will be available at `http://localhost:3000`.
API documentation will be available at `http://localhost:3000/api`.

## API Documentation

The API is documented using Swagger. Once the application is running, visit `/api` to access the interactive API documentation.

## Project Structure

```
src/
├── config/                 # Configuration files
├── modules/               # Feature modules
│   ├── auth/             # Authentication module
│   ├── users/            # User management
│   ├── land-registration/# Land registration
│   ├── land-transfer/    # Land transfer
│   ├── land-taxes/       # Land taxes
│   ├── conflict-resolution/ # Conflict resolution
│   ├── urbanization/     # Construction permits
│   └── settings/         # System settings
└── common/               # Shared resources
    ├── decorators/       # Custom decorators
    ├── guards/           # Auth guards
    ├── interfaces/       # TypeScript interfaces
    ├── dto/             # Data transfer objects
    ├── entities/        # TypeORM entities
    └── enums/           # Enumerations
```

## Security

- All endpoints are protected with JWT authentication
- Role-based access control is implemented
- Passwords are hashed using bcrypt
- Input validation using class-validator
- TypeORM query parameterization for SQL injection prevention

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
