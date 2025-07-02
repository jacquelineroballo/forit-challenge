import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TaskForm = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		status: 'pending',
	})
	const [errors, setErrors] = useState({
		title: '',
		description: '',
		server: null
	})

	useEffect(() => {
		if (id) {
			fetchTask()
		}
	}, [id])

	const fetchTask = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`)
			if (!response.ok) throw new Error('Error al cargar la tarea')
			const data = await response.json()
			setFormData(data)
		} catch (err) {
			setErrors(prev => ({ ...prev, server: err.message }))
		}
	}

	const validateField = (name, value) => {
		switch (name) {
			case 'title':
				if (!value.trim()) return 'El título es requerido'
				if (value.length < 3) return 'El título debe tener al menos 3 caracteres'
				if (value.length > 50) return 'El título no puede exceder los 50 caracteres'
				return ''
			case 'description':
				if (!value.trim()) return 'La descripción es requerida'
				if (value.length < 10) return 'La descripción debe tener al menos 10 caracteres'
				if (value.length > 200) return 'La descripción no puede exceder los 200 caracteres'
				return ''
			default:
				return ''
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
		setErrors(prev => ({
			...prev,
			[name]: validateField(name, value)
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		// Validar todos los campos antes de enviar
		const newErrors = {
			title: validateField('title', formData.title),
			description: validateField('description', formData.description),
			server: null
		}

		setErrors(newErrors)

		// Si hay errores, no enviar el formulario
		if (newErrors.title || newErrors.description) {
			return
		}

		try {
			const url = id
				? `${import.meta.env.VITE_API_URL}/api/tasks/${id}`
				: `${import.meta.env.VITE_API_URL}/api/tasks`

			const response = await fetch(url, {
				method: id ? 'PUT' : 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) throw new Error('Error al guardar la tarea')
			navigate('/')
		} catch (err) {
			setError(err.message)
		}
	}

	return (
		<div className='container py-4'>
			<div className='task-form-container'>
				<h2 className='mb-4'>{id ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
				{errors.server && <div className='alert alert-danger'>{errors.server}</div>}
				<form onSubmit={handleSubmit} className='task-form'>
					<div className='form-group mb-3'>
						<label htmlFor='title' className='form-label'>
							Título
						</label>
						<input
							type='text'
							className='form-control'
							id='title'
							name='title'
							value={formData.title}
							onChange={handleChange}
							required
						/>
						{errors.title && (
							<div className='invalid-feedback d-block'>{errors.title}</div>
						)}
					</div>

					<div className='form-group mb-3'>
						<label htmlFor='description' className='form-label'>
							Descripción
						</label>
						<textarea
							className='form-control'
							id='description'
							name='description'
							value={formData.description}
							onChange={handleChange}
							rows='4'
							required
						/>
						{errors.description && (
							<div className='invalid-feedback d-block'>{errors.description}</div>
						)}
					</div>

					<div className='form-group mb-4'>
						<label htmlFor='status' className='form-label'>
							Estado
						</label>
						<select
							className='form-select'
							id='status'
							name='status'
							value={formData.status}
							onChange={handleChange}
						>
							<option value='pending'>Pendiente</option>
							<option value='in-progress'>En Progreso</option>
							<option value='completed'>Completada</option>
						</select>
					</div>

					<div className='d-flex justify-content-end gap-2'>
						<button
							type='button'
							onClick={() => navigate('/')}
							className='btn btn-secondary btn-cancel'
						>
							Cancelar
						</button>
						<button type='submit' className='btn btn-primary btn-submit'>
							{id ? 'Actualizar Tarea' : 'Crear Tarea'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default TaskForm
