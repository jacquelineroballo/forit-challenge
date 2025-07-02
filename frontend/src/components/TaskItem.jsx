import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const TaskItem = ({ task, onDelete }) => {
	const { id, title, description, status, createdAt } = task

	const getStatusClass = (status) => {
		const statusMap = {
			pending: 'bg-warning text-dark',
			'in-progress': 'bg-info text-dark',
			completed: 'bg-success text-white',
		}
		return `badge ${statusMap[status] || 'bg-warning text-dark'}`
	}

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('es-419', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	return (
		<div className='card h-100 shadow-sm task-item'>
			<div className='card-body'>
				<div className='d-flex justify-content-between align-items-start mb-3'>
					<h5 className='card-title mb-0'>{title}</h5>
					<span className={getStatusClass(status)}>
						{status === 'pending'
							? 'Pendiente'
							: status === 'in-progress'
							? 'En Progreso'
							: status === 'completed'
							? 'Completada'
							: status}
					</span>
				</div>
				<p className='card-text text-muted mb-3'>{description}</p>
				<div className='d-flex justify-content-between align-items-center'>
					<small className='text-muted'>
						<i className='bi bi-calendar3 me-2'></i>
						{formatDate(createdAt)}
					</small>
					<div className='btn-group'>
						<Link
							to={`/edit/${id}`}
							className='btn btn-outline-primary btn-sm d-flex justify-content-center align-items-center'
						>
							<i className='bi bi-pencil me-1'></i>
							Editar
						</Link>
						<button
							onClick={() => onDelete(id)}
							className='btn btn-outline-danger btn-sm d-flex justify-content-center align-items-center'
						>
							<i className='bi bi-trash me-1'></i>
							Eliminar
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

TaskItem.propTypes = {
	task: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		status: PropTypes.string,
		createdAt: PropTypes.string,
	}).isRequired,
	onDelete: PropTypes.func.isRequired,
}

export default TaskItem
