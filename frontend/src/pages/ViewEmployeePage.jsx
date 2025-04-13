import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewEmployeePage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/employees/${id}`)
      .then(res => setEmployee(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <button onClick={() => navigate(-1)} className="text-blue-600 mb-4">← Back</button>
      <h1 className="text-2xl font-bold mb-4 text-center">View Employee</h1>

      <img src={`http://localhost:5000/uploads/${employee.image}`} alt="emp" className="w-24 h-24 object-cover rounded-full mx-auto mb-4" />
      <h2 className="text-xl font-bold text-center mb-4">{employee.name}</h2>
      <div className="space-y-2">
        <p><strong>ID:</strong> {employee.employeeId}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Designation:</strong> {employee.designation}</p>
        <p><strong>Project:</strong> {employee.project}</p>
        <p><strong>Type:</strong> {employee.type}</p>
        <p><strong>Status:</strong> {employee.status}</p>
      </div>
    </div>
  );
}

export default ViewEmployeePage;
