import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';

function EmployeeListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Employee</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by name or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-4 py-2" />
          <button
            onClick={() => navigate('/employee/add')}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center" >
            + Add Employee
          </button>
        </div>
      </div>

      <EmployeeList searchQuery={search} />
    </div>
  );
}

export default EmployeeListPage;
