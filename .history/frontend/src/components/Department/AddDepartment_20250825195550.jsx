import React, { useState } from 'react';

const AddDepartment = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Simulate API call
    setTimeout(() => {
      if (name.trim() === '') {
        setError('Department name is required.');
        setLoading(false);
        return;
      }
      setSuccess('Department added successfully!');
      setName('');
      setDescription('');
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
      <h2 className="text-xl font-bold mb-6 text-blue-700 text-center">Add New Department</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 rounded">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 rounded">
          <p className="text-green-700 text-sm font-medium">{success}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
            Department Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="e.g. Human Resources"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Brief description of the department"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded font-semibold text-white transition-colors ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Adding...' : 'Add Department'}
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
