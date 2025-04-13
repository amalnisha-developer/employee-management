// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EmployeeListPage from './pages/EmployeeListPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import ViewEmployeePage from './pages/ViewEmployeePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="employee" element={<EmployeeListPage />} />
          <Route path="employee/add" element={<AddEmployeePage />} />
          <Route path="/employee/:id/view" element={<ViewEmployeePage />} />
          <Route path="/employee/:id/edit" element={<EditEmployeePage/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
