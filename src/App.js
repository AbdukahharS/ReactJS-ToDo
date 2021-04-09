import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import Form from './components/Form'
import Controllers from './components/Controllers'

function App() {
  const [ showAddTask, setShowAddTask] = useState(false)
  const [ tasks, setTasks] = useState([])
  const [ filter, setFilter ] = useState('all')


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('https://todo-apis.shaxzodqaxxorov.repl.co/')
    const api = await res.json()
    const data = await api.data

    return data
  }

  //Add Task
  const addTask = async (name) => {
    const res = await fetch('https://todo-apis.shaxzodqaxxorov.repl.co', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(name),
    })
    const data = await res.json()

    setTasks([...tasks, data.data])
  }

  //DELETE Task
  const deleteTask = async (id) => {
    await fetch(`https://todo-apis.shaxzodqaxxorov.repl.co/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task._id !== id))
  }

  // Toggle status
  const toggleActive = async (id) => {   
	const res = await fetch(`https://todo-apis.shaxzodqaxxorov.repl.co/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
    })

    const api = await res.json()
	const data = api.data
	const status = data.status === 'active' ? 'completed' : 'active'
	
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, status: status } : task
	  )
    )
  }
  
	//Delete all completed
	const deleteCompleted = async () => {
		const res = await fetch('https://todo-apis.shaxzodqaxxorov.repl.co/deletecompleted/', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			}
		})
		
		const data = await res.json()
		if (data.message === 'succes' && data.data.deletedCount !== 0) {
			setTasks(tasks.filter((task) => task.status !== 'completed')) 
		}
		else alert('Someting went wrong')
	}
	
	//Toggle status all
	const toggleStatusAll = async () => {
		if (tasks.filter(sortCompleted).length !== tasks.length) {
			const res = await fetch('https://todo-apis.shaxzodqaxxorov.repl.co/completeall/', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				}
			})
			
			const data = await res.json()
			if (data.message === 'succes') {
				 setTasks(
				  tasks.map((task) =>
					task.status === 'active' ? { ...task, status: "completed" } : task
				  )
				) 
			}
			else alert('Someting went wrong')
		} else {
			const res = await fetch('https://todo-apis.shaxzodqaxxorov.repl.co/activeall/', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				}
			})
			
			const data = await res.json()
			if (data.message === 'succes') {
				 setTasks(
				  tasks.map((task) =>
					task.status === 'completed' ? { ...task, status: "active" } : task
				  )
				) 
			}
			else alert('Someting went wrong')
		}
	}
	
  const editFilter = newFilter => {
	  const filters = document.querySelectorAll('.filters button')
	  const filterBtn = document.querySelector('#' + newFilter)
	  for (let i = 0; i < filters.length; i++) {
		  filters[i].className = '';
	  }
	  filterBtn.className = 'current'
	  setFilter(newFilter)
  }
  const sortCompleted = task => {return task.status === 'completed'}
  const sortActive = task => {return task.status === 'active'}

  return (
      <div className="app">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
		<div className="container">
        <Form 
			onAdd={addTask} 
			sortCompleted={sortCompleted} 
			tasks={tasks} 
			toggleStatusAll={toggleStatusAll} 
		/>
        {tasks.length > 0 ? (
			<Tasks
				tasks={
					filter === 'all' ? tasks : (filter === 'completed' ? tasks.filter(sortCompleted) : tasks.filter(sortActive))
				}
				onDelete={deleteTask}
				onToggle={toggleActive}
			/>
		) : (
            <h1 className="alt">No tasks to show</h1>
        )}
		<Controllers
			tasks={tasks}
			sortCompleted={sortCompleted}
			editFilter={editFilter}
			deleteCompleted={deleteCompleted}
		/>
		</div>
        <Footer />
      </div>
  )
}

export default App
