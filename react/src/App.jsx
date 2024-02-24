import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Tasks
import useDB from '../../'
const db = useDB()
const taskCollection = db.collection('tasks', 'tasks')
function addTask() {
  taskCollection.add({ title: 'New Task @ ' + Date.now() })
}

function App() {
  const [count, setCount] = useState(0)  

  // Tasks
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    taskCollection.list(setTasks)
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      { /* Tasks */ }
       
      <div>
        <h2>Tasks</h2>
        <p><button onClick={addTask}>Add Task</button></p>
        <ul>
          { tasks.map(task => (
            <li key={task.$key}>
              { task.title }
              &nbsp;
              <button onClick={() => taskCollection.remove(task.$key)}>❌</button>
            </li>
          )) }
        </ul>
      </div>

    </>
  )
}

export default App
