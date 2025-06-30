import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`);
      if (!response.ok) throw new Error('Failed to fetch task');
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = id
        ? `${import.meta.env.VITE_API_URL}/api/tasks/${id}`
        : `${import.meta.env.VITE_API_URL}/api/tasks`;

      const response = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save task');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="task-form-container">
      <h2>{id ? 'Edit Task' : 'Create New Task'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            {id ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;