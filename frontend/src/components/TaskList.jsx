import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TaskItem from './TaskItem'

const TaskList = () => {
	const [tasks, setTasks] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetchTasks()
	}, [])

	const fetchTasks = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`)
			if (!response.ok) throw new Error('Error al cargar las tareas')
			const data = await response.json()
			setTasks(data)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async (id) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
				method: 'DELETE',
			})
			if (!response.ok) throw new Error('Error al eliminar la tarea')
			setTasks(tasks.filter((task) => task.id !== id))
		} catch (err) {
			setError(err.message)
		}
	}

	if (loading)
		return (
			<div className='container text-center py-5'>
				<div className='spinner-border text-primary' role='status'>
					<span className='visually-hidden'>Cargando...</span>
				</div>
			</div>
		)
	if (error)
		return (
			<div className='container py-5'>
				<div className='alert alert-danger'>{error}</div>
			</div>
		)

	return (
		<div className='container py-4'>
			<div className='task-list'>
				<div className='d-flex justify-content-between align-items-center mb-4'>
					{/* <h2>Tareas</h2> */}
					<Link to='/new' className='btn btn-success btn-add'>
						<i className='bi bi-plus-circle me-2'></i>Agregar Nueva Tarea
					</Link>
				</div>
				{tasks.length === 0 ? (
					<div className='text-center py-5'>
						<p className='text-muted fs-5'>No hay tareas disponibles</p>
					</div>
				) : (
					<div className='row g-4'>
						{tasks.map((task) => (
							<div key={task.id} className='col-12 col-md-6 col-lg-4'>
								<TaskItem task={task} onDelete={handleDelete} />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default TaskList
