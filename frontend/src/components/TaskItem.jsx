import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TaskItem = ({ task, onDelete }) => {
  const { id, title, description, status, createdAt } = task;

  const getStatusClass = (status) => {
    const statusMap = {
      pending: 'status-pending',
      'in-progress': 'status-progress',
      completed: 'status-completed'
    };
    return statusMap[status] || 'status-pending';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="task-item">
      <div className="task-header">
        <h3>{title}</h3>
        <span className={`status-badge ${getStatusClass(status)}`}>
          {status}
        </span>
      </div>
      <p className="task-description">{description}</p>
      <div className="task-footer">
        <span className="task-date">{formatDate(createdAt)}</span>
        <div className="task-actions">
          <Link to={`/edit/${id}`} className="btn-edit">Edit</Link>
          <button
            onClick={() => onDelete(id)}
            className="btn-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskItem;