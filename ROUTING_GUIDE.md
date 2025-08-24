# 🚀 Employee Management System - Routing Structure

## 📁 File Architecture

```
src/
├── main.jsx                 # Entry point with routing setup
├── App.jsx                  # Main route definitions
├── context/
│   ├── authContext.jsx      # Authentication state management
│   └── userContext.js       # User context definition
├── pages/
│   ├── Login.jsx           # Login page component
│   ├── AdminDashboard.jsx  # Admin dashboard with nested routes
│   └── EmployeeDashboard.jsx # Employee dashboard
├── utils/
│   ├── PrivateRoutes.jsx   # Authentication guard
│   └── RoleBaseRoutes.jsx  # Role-based access control
└── components/
    └── ErrorBoundary.jsx   # Error handling component
```

## 🛣️ Routing Flow

### 1. **main.jsx - Application Bootstrap**

```jsx
BrowserRouter
  └── AuthProvider
      └── App (Routes Container)
```

### 2. **App.jsx - Route Definitions**

```jsx
Routes:
  ├── "/" → Navigate to "/login"
  ├── "/login" → Login Component
  ├── "/admin-dashboard/*" → Protected Admin Routes
  ├── "/employee-dashboard/*" → Protected Employee Routes
  └── "*" → Navigate to "/login" (404 fallback)
```

### 3. **Route Protection Layers**

```jsx
Protected Route Structure:
  PrivateRoutes (Check if authenticated)
    └── RoleBaseRoutes (Check user role)
        └── Dashboard Component
```

## 🔐 Authentication Flow

1. **User visits any route**
2. **AuthProvider checks localStorage for token**
3. **If token exists:**
   - Demo token → Load demo user
   - Real token → Verify with backend
4. **PrivateRoutes component checks authentication**
5. **RoleBaseRoutes component checks user permissions**
6. **Render appropriate dashboard or redirect to login**

## 📍 Route Examples

### Public Routes:

- `http://localhost:5174/` → Redirects to login
- `http://localhost:5174/login` → Login page

### Protected Admin Routes:

- `http://localhost:5174/admin-dashboard/` → Admin dashboard home
- `http://localhost:5174/admin-dashboard/departments` → Department management
- `http://localhost:5174/admin-dashboard/employees` → Employee management
- `http://localhost:5174/admin-dashboard/leave` → Leave management
- `http://localhost:5174/admin-dashboard/salary` → Salary management
- `http://localhost:5174/admin-dashboard/settings` → Settings

### Protected Employee Routes:

- `http://localhost:5174/employee-dashboard/` → Employee dashboard
- `http://localhost:5174/employee-dashboard/profile` → Employee profile
- `http://localhost:5174/employee-dashboard/leave` → Employee leave requests

## 🔄 Navigation Flow

```
User Login → Authentication Check → Role Check → Dashboard Redirect

┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│    Login    │ -> │ PrivateRoutes│ -> │RoleBaseRoutes│ -> │  Dashboard   │
│   Page      │    │   (Auth)     │    │   (Role)    │    │   Component  │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
```

## 🛡️ Security Features

1. **Route Guards**: PrivateRoutes and RoleBaseRoutes
2. **Token Validation**: Automatic token verification
3. **Role-based Access**: Different dashboards for admin/employee
4. **Fallback Routes**: Unknown routes redirect to login
5. **Error Boundaries**: Graceful error handling

## 📝 Usage Examples

### Accessing Admin Dashboard:

1. Login with: `admin@test.com` / `admin123`
2. Automatically redirected to `/admin-dashboard`
3. Can navigate to nested routes like `/admin-dashboard/employees`

### Accessing Employee Dashboard:

1. Login with: `employee@test.com` / `emp123`
2. Automatically redirected to `/employee-dashboard`
3. Limited access based on employee role

## 🔧 Development Notes

- **Hot Module Replacement**: Changes update instantly
- **Console Logging**: Detailed routing logs for debugging
- **Error Handling**: Global error boundaries and handlers
- **Type Safety**: Proper TypeScript support (if enabled)
