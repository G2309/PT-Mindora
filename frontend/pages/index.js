import { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function Home() {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'
    const { data, error, mutate } = useSWR(`${base}/todos`, fetcher)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    
	if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    
	const add = async () => {
        await fetch(`${base}/todos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description: desc })
        })
        setTitle('')
        setDesc('')
        mutate()
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
    }
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
			<h1>Mindora ToDo</h1>
            	<div style={{ marginBottom: 12 }}>
            		<input placeholder="title" value={title} onChange={e=>setTitle(e.target.value)} />
            		<input placeholder="description" value={desc} onChange={e=>setDesc(e.target.value)} />
            		<button onClick={add}>Add</button>
        		</div>
        	<ul>
				{data.map(t => (
            		<li key={t._id} style={{ marginBottom: 8 }}>
            		<strong>{t.title}</strong> {t.description && `- ${t.description}`}
            			<div>
                			<button onClick={()=>toggle(t._id, t.completed)}>{t.completed ? 'Mark open' : 'Mark done'}</button>
							<button onClick={()=>remove(t._id)}>Delete</button>
            			</div>
					</li>
        		))}
    		</ul>
    	</div>
	)
}
