const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const Todo = require('./models/todo')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/mindora'
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/todos', async (req, res) => {
  const todos = await Todo.find()
  res.json(todos)
})

app.get('/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  if (!todo) return res.status(404).json({ error: 'Not found' })
  res.json(todo)
})

app.post('/todos', async (req, res) => {
  const { title, description, dueDate, priority, completed } = req.body
  const todo = new Todo({ title, description, dueDate, priority, completed })
  await todo.save()
  res.status(201).json(todo)
})

app.put('/todos/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!updated) return res.status(404).json({ error: 'Not found' })
  res.json(updated)
})

app.delete('/todos/:id', async (req, res) => {
  const deleted = await Todo.findByIdAndDelete(req.params.id)
  if (!deleted) return res.status(404).json({ error: 'Not found' })
  res.json({ success: true })
})

const port = process.env.PORT || 4000
app.listen(port, () => { console.log(`Server listening ${port}`) })
