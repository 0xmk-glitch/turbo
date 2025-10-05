# 🚀 Turbo Task Master

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-18+-green.svg)
![Angular](https://img.shields.io/badge/angular-19.2-red.svg)
![NestJS](https://img.shields.io/badge/nestjs-10.4-red.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.7-blue.svg)

**A comprehensive task management system with enterprise-grade security and multi-tenant architecture**

[Features](#-features) • [Quick Start](#-quick-start) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

Turbo Task Master is a modern, full-stack task management application built with enterprise-grade security and scalability in mind. It features a robust NX monorepo architecture with separate frontend and backend applications, comprehensive role-based access control (RBAC), and multi-tenant organization support.

### Key Highlights

- 🔐 **Enterprise Security**: RSA-based JWT authentication with role-based access control
- 🏢 **Multi-Tenant**: Hierarchical organization structure with isolated data
- 📱 **Modern UI**: Angular 19 with PrimeNG components and TailwindCSS
- 🚀 **High Performance**: NestJS backend with TypeORM and optimized queries
- 🧪 **Well Tested**: Comprehensive test coverage with Jest and Cypress
- 📊 **Audit Trail**: Complete audit logging for compliance and debugging

## ✨ Features

### 🔐 Authentication & Authorization
- **RSA-based JWT tokens** for secure authentication
- **Role-based access control** (Owner, Admin, Viewer)
- **Multi-tenant organization** support with hierarchical structure
- **Session management** with secure token handling

### 📋 Task Management
- **Create, update, and delete** tasks with rich metadata
- **Task assignment** to specific users within organizations
- **Priority levels** and status tracking
- **Due date management** with notifications
- **Task categorization** (work, personal, home)

### 👥 User & Organization Management
- **User registration** with email verification
- **Organization creation** and management
- **Hierarchical organization** structure (parent-child relationships)
- **User role management** within organizations
- **API key generation** for organization access

### 📊 Audit & Monitoring
- **Comprehensive audit logging** for all operations
- **User activity tracking** with IP and user agent logging
- **Change history** with before/after values
- **Compliance-ready** audit trails

### 🎨 Modern User Interface
- **Responsive design** with mobile support
- **Dark/Light theme** support
- **Real-time updates** with state management
- **Intuitive task management** interface
- **Advanced filtering** and search capabilities

## 🏗️ Architecture

### NX Monorepo Structure

```
turbo-task-master/
├── apps/
│   ├── api/                 # NestJS Backend API
│   ├── api-e2e/            # API End-to-End Tests
│   ├── dashboard/           # Angular Frontend
│   └── dashboard-e2e/      # Frontend E2E Tests
├── libs/
│   ├── auth/               # Authentication & RBAC Logic
│   ├── auth-shared/        # Shared Authentication Types
│   ├── api-interfaces/     # API DTOs & Interfaces
│   ├── config/             # Configuration Management
│   ├── data/               # Data Models & DTOs
│   ├── data-access/        # Data Access Layer
│   └── util/               # Utility Functions
├── scripts/                # Development & Testing Scripts
├── docs/                   # Project Documentation
└── config/keys/           # RSA Keys (Secure)
```

### Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **Frontend** | Angular | 19.2 |
| **Backend** | NestJS | 10.4 |
| **Database** | TypeORM + SQLite/PostgreSQL | Latest |
| **Authentication** | JWT + RSA | Latest |
| **UI Framework** | PrimeNG + TailwindCSS | Latest |
| **State Management** | NgRx | 20.0 |
| **Testing** | Jest + Cypress | Latest |
| **Build System** | NX | 21.5 |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/turbo-task-master.git
   cd turbo-task-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate RSA keys for JWT authentication**
   ```bash
   node scripts/generate-rsa-keys.js
   ```

4. **Set up environment variables**
   ```bash
   cp apps/api/.env.example apps/api/.env
   # Edit apps/api/.env with your configuration
   ```

5. **Start the development servers**
   ```bash
   # Start the API server
   npm run start:api

   # In another terminal, start the dashboard
   npm run start:dashboard
   ```

### Access Points

- **API Server**: http://localhost:3000
- **Dashboard**: http://localhost:4200
- **API Documentation**: http://localhost:3000/docs
- **Swagger UI**: http://localhost:3000/docs

## 📚 API Documentation

### Authentication

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "SecurePass123!"
}
```

#### Register with Organization
```http
POST /auth/register-with-org
Content-Type: application/json

{
  "email": "founder@company.com",
  "password": "SecurePass123!",
  "name": "Company Founder",
  "organizationName": "My Company",
  "organizationDescription": "A new startup"
}
```

### Task Management

#### Create Task
```http
POST /tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Implement user authentication",
  "description": "Add JWT-based authentication system",
  "type": "work",
  "priority": 3,
  "assignedTo": "user-uuid",
  "dueDate": "2024-02-15"
}
```

#### Get Tasks
```http
GET /tasks
Authorization: Bearer <jwt_token>
```

### Organization Management

#### Create Organization
```http
POST /organizations/register
Content-Type: application/json

{
  "name": "Tech Startup Inc",
  "description": "A technology startup company"
}
```

#### Get Organizations
```http
GET /organizations
Authorization: Bearer <jwt_token>
```

### Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **Owner** | Full system access, manage all organizations |
| **Admin** | Manage users and tasks within organization |
| **Viewer** | Read-only access to assigned tasks |

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run start:api          # Start API server
npm run start:dashboard    # Start Angular dashboard
npm run start:all          # Start both servers

# Building
npm run build:api          # Build API
npm run build:dashboard    # Build dashboard
npm run build:all          # Build all applications

# Testing
npm run test               # Run all tests
npm run test:api           # Run API tests
npm run test:dashboard     # Run dashboard tests
npm run test:e2e           # Run end-to-end tests

# Linting
npm run lint               # Lint all projects
npm run lint:fix           # Fix linting issues

# NX Commands
npx nx serve api           # Serve API
npx nx serve dashboard     # Serve dashboard
npx nx test api            # Test API
npx nx build api           # Build API
```

### Environment Configuration

Create `apps/api/.env`:

```env
# JWT Configuration
JWT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=turbodb

# API Configuration
PORT=3000
NODE_ENV=development

# Logging
LOGGING_ENABLED=true
LOG_LEVEL=INFO
AUDIT_LOGGING_ENABLED=true
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:api           # API unit tests
npm run test:dashboard     # Frontend unit tests
npm run test:e2e           # End-to-end tests

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Authentication Flow

```bash
# Test the complete authentication flow
node scripts/test-auth.js
```

### Test Structure

- **Unit Tests**: Jest for both frontend and backend
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Cypress for full user workflows
- **Component Tests**: Angular component testing

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build:all

# The built applications will be in:
# - dist/apps/api/
# - dist/apps/dashboard/
```

### Docker Deployment

```bash
# Build Docker image
docker build -t turbo-task-master .

# Run container
docker run -p 3000:3000 turbo-task-master
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
DB_HOST=your-production-db-host
DB_PORT=5432
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password
DB_DATABASE=your-db-name
JWT_PRIVATE_KEY=your-production-private-key
JWT_PUBLIC_KEY=your-production-public-key
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run the test suite**
   ```bash
   npm test
   ```
6. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
7. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write comprehensive tests for new features
- Update documentation for API changes
- Ensure all tests pass before submitting PR
- Use conventional commit messages

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for consistent code style
- **Prettier**: Automatic code formatting
- **Angular**: Follow Angular style guide
- **NestJS**: Follow NestJS best practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Angular](https://angular.io/) and [NestJS](https://nestjs.com/)
- UI components by [PrimeNG](https://primeng.org/)
- Styling with [TailwindCSS](https://tailwindcss.com/)
- Monorepo management with [NX](https://nx.dev/)
- Database management with [TypeORM](https://typeorm.io/)

---

<div align="center">

**Built with ❤️ by the Turbo Task Master Team**

[Report Bug](https://github.com/your-username/turbo-task-master/issues) • [Request Feature](https://github.com/your-username/turbo-task-master/issues) • [Documentation](https://github.com/your-username/turbo-task-master/wiki)

</div>
