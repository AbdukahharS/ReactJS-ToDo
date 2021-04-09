import { FaTimes, FaCheck } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
	// ${task.status === 'completed' ? 'reminder' : ''}`}
	//onDoubleClick={() => onToggle(task._id)}
  return (
    <div className="task">
      <h3>
		<button onClick={() => onToggle(task._id)} className="check-btn">
			{
				task.status === 'completed' 
				&& 
				<FaCheck style={{ color: 'green', cursor: 'pointer' }}/>
			}
		</button>
        {task.status === 'completed' ? <strike>{task.name}</strike> : task.name}
        <FaTimes
		className="del"
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => {
            onDelete(task._id)
          }}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  )
}

export default Task
