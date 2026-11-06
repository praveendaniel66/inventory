// src/Routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';

// Pages
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import SuppliersPage from './pages/SuppliersPage';
import CustomersPage from './pages/CustomersPage';
import PurchaseManagementPage from './pages/PurchaseManagementPage';
import SalesManagementPage from './pages/SalesManagementPage';
import ReportsPage from './pages/ReportsPage';
import UserManagementPage from './pages/UserManagementPage';
import EmployeeSalaryPage from './pages/EmployeeSalaryPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="products/:productId" element={<ProductDetailsPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="purchases" element={<PurchaseManagementPage />} />
        <Route path="sales" element={<SalesManagementPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="employee-salaries" element={<EmployeeSalaryPage />} />

        {/* Default Protected Route */}
        <Route index element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
