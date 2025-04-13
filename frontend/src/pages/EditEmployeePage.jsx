import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: '',
    designation: '',
    project: '',
    type: '',
    status: ''
  });
  const [employeeImage, setEmployeeImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const departments = ['Design', 'Development', 'Deployment', 'Digital Marketing', 'IT'];
  const designations = ['Design Lead', 'Team Lead', 'Developer', 'Marketing Manager'];
  const projects = ['Car Rental', 'E-Commerce', 'Website Redesign', 'Mobile App', 'others'];
  const types = ['Office', 'Remote', 'Hybrid'];
  const statuses = ['Permanent', 'Contract', 'Internship'];

  useEffect(() => {
    axios.get(`http://localhost:5000/api/employees/${id}`)
      .then(res => {
        setFormData(res.data);
        setPreviewUrl(`http://localhost:5000/uploads/${res.data.image}`);
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEmployeeImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (employeeImage) data.append('employeeImage', employeeImage);

      await axios.put(`http://localhost:5000/api/employees/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert("Employee updated successfully");
      navigate('/employee');
    } catch (error) {
      console.error(error);
      alert("Failed to update employee");
    }
  };

  return (
    <div className="bg-white p-6 rounded-md max-w-4xl mx-auto">
            <button onClick={() => navigate(-1)} className="text-blue-600 mb-4">← Back</button>

      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div className="relative w-32 h-32">
          <img src={previewUrl} alt="preview" className="w-full h-full object-cover rounded border" />
          <input type="file" onChange={handleImageChange} className="hidden" id="upload" />
          <button type="button" onClick={() => document.getElementById('upload').click()} className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow">✏️</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" placeholder="Name" required />
          <input name="employeeId" value={formData.employeeId} onChange={handleChange} className="border p-2 w-full" placeholder="Employee ID" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select name="department" value={formData.department} onChange={handleChange} className="border p-2 w-full" required>
            <option value="">Select Department</option>
            {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>

          <select name="designation" value={formData.designation} onChange={handleChange} className="border p-2 w-full" required>
            <option value="">Select Designation</option>
            {designations.map(des => <option key={des} value={des}>{des}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select name="project" value={formData.project} onChange={handleChange} className="border p-2 w-full">
            <option value="">Select Project</option>
            {projects.map(proj => <option key={proj} value={proj}>{proj}</option>)}
          </select>

          <select name="type" value={formData.type} onChange={handleChange} className="border p-2 w-full">
            <option value="">Select Type</option>
            {types.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <select name="status" value={formData.status} onChange={handleChange} className="border p-2 w-2/4">
          <option value="">Select Status</option>
          {statuses.map(stat => <option key={stat} value={stat}>{stat}</option>)}
        </select>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployeePage;
