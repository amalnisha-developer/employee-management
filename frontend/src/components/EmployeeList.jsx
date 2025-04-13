import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function EmployeeList({ searchQuery }) {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('http://localhost:5000/api/employees')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      alert("Are you sure you want to delete this employee?")
    } catch (error) {
      console.error(error);
      alert("Failed to delete employee");
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded shadow p-4">
      <table className="min-w-full border">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Designation</th>
            <th className="px-4 py-2">Project</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-6 font-medium text-gray-600">
                No records found
              </td>
            </tr>
          ) : (
            filteredEmployees.map(emp => (
              <tr key={emp.id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={`http://localhost:5000/uploads/${emp.image}`}
                    alt="emp"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.employeeId}</td>
                <td className="px-4 py-2">{emp.department}</td>
                <td className="px-4 py-2">{emp.designation}</td>
                <td className="px-4 py-2">{emp.project}</td>
                <td className="px-4 py-2">{emp.type}</td>
                <td className="px-4 py-2">{emp.status}</td>
                <td className="px-4 py-2 flex gap-3">
                  <button onClick={() => navigate(`/employee/${emp.id}/view`)}><Eye className="w-5 h-5 mt-3 text-blue-500" /></button>
                  <button onClick={() => navigate(`/employee/${emp.id}/edit`)}><Pencil className="w-5 h-5 mt-3 text-green-500" /></button>
                  <button onClick={() => handleDelete(emp.id)}><Trash2 className="w-5 h-5 text-red-500 mt-3" /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
