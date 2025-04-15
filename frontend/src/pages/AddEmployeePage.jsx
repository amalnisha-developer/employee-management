import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import employee from '../assets/download.jpg'

function AddEmployeePage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;  

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
  const types = ['Office', 'Remote', 'Hybrid'];
  const statuses = ['Permanent', 'Contract', 'Internship'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployeeImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const data = new FormData();

    
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

  
      if (employeeImage) {
        data.append('employeeImage', employeeImage);
      }

    
      await axios.post(`${API_URL}/api/employees`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Employee successfully added!');
      setFormData({
        name: '',
        employeeId: '',
        department: '',
        designation: '',
        project: '',
        type: '',
        status: ''
      });
      setEmployeeImage(null);
      setPreviewUrl('');
     
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Error adding employee');
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-md max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 19a1 1 0 01-.7-.29l-7-7a1 1 0 010-1.42l7-7a1 1 0 111.4 1.42L4.41 10l6.3 6.29A1 1 0 0110 19z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="bg-white p-6 rounded-md max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Add New Employee</h1>
        <p className="text-gray-500 mb-6">Personal Information</p>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          {/* Image Upload */}
          <div className="relative w-32 h-32">
            <img
              src={previewUrl || employee}
              alt="Employee preview"
              className="w-full h-full object-cover rounded border border-dashed border-gray-400"
              onClick={() => document.getElementById('employeeImageInput').click()}
            />
            <button
              type="button"
              onClick={() => document.getElementById('employeeImageInput').click()}
              className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow hover:bg-blue-100 transition"
              title="Change Image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536M9 13l6-6m2-2a2.828 2.828 0 114 4L9 21H5v-4L17.232 7.232z"
                />
              </svg>
            </button>
            <input
              type="file"
              id="employeeImageInput"
              name="employeeImage"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Employee ID*</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Department*</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option value={dept} key={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Designation*</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Designation</option>
                {designations.map(des => (
                  <option value={des} key={des}>{des}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Project</label>
              <input
                type="text"
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Type</option>
                {types.map(type => (
                  <option value={type} key={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-2/4 border rounded px-3 py-2"
              >
                <option value="">Select Status</option>
                {statuses.map(status => (
                  <option value={status} key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              className="border border-gray-400 text-gray-600 px-4 py-2 rounded"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddEmployeePage;
