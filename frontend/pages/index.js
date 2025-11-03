import { useState } from 'react'
import useSWR from 'swr'
const fetcher = (url) => fetch(url).then(r => r.json())

export default function Home() {
	const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'
    
	const { data, error, mutate } = useSWR(`${base}/todos`, fetcher)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [due, setDue] = useState('')
    const [priority, setPriority] = useState('medium')
    const [notif, setNotif] = useState(null)

    if (error) return <div className="center">Error al cargar</div>
    if (!data) return <div className="center">Cargando...</div>
    
	const show = (msg) => {
        setNotif(msg)
        setTimeout(()=>setNotif(null), 3000)
    }
    
	const add = async () => {
        if (!title.trim()) { show('El título es obligatorio'); return }
        await fetch(`${base}/todos`, {
        	method: 'POST',
        	headers: { 'Content-Type': 'application/json' },
        	body: JSON.stringify({ title, description: desc, dueDate: due || null, priority })
        })
		setTitle(''); setDesc(''); setDue(''); setPriority('medium')
        mutate()
        show('Tarea creada')
    }
    
	const toggle = async (id, current) => {
		await fetch(`${base}/todos/${id}`, {
        	method: 'PUT',
        	headers: { 'Content-Type': 'application/json' },
        	body: JSON.stringify({ completed: !current })
		})
		mutate()
    }
    
	const remove = async (id) => {
		await fetch(`${base}/todos/${id}`, { method: 'DELETE' })
		mutate()
		show('Tarea eliminada')
    }
    
	return (
      <div className="page">
        <header className="header">
          <h1>Lista de Tareas</h1>
        </header>
        {notif && <div className="notif">{notif}</div>}
        <main className="container">
          <section className="form">
            <input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
            <input placeholder="Descripción" value={desc} onChange={e=>setDesc(e.target.value)} />
            <input type="date" value={due} onChange={e=>setDue(e.target.value)} />
            <select value={priority} onChange={e=>setPriority(e.target.value)}>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            <button className="primary" onClick={add}>Agregar</button>
          </section>
          <section className="list">
            {data.length === 0 && <div className="empty">No hay tareas todavía</div>}
            {data.map(t => (
              <article key={t._id} className={`card ${t.completed ? 'done' : ''}`}>
                <div className="card-left">
                  <h3>{t.title}</h3>
                  {t.description && <p className="muted">{t.description}</p>}
                  <div className="meta">
                    {t.dueDate && <span>Vence: {new Date(t.dueDate).toLocaleDateString()}</span>}
                    <span className={`badge ${t.priority}`}>{t.priority === 'low' ? 'Baja' : t.priority === 'medium' ? 'Media' : 'Alta'}</span>
                  </div>
                </div>
                <div className="card-actions">
                  <button onClick={()=>toggle(t._id, t.completed)}>{t.completed ? 'Reabrir' : 'Hecho'}</button>
                  <button className="danger" onClick={()=>remove(t._id)}>Eliminar</button>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
  )
}

