import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'

const Form = ({ onAdd, sortCompleted, tasks, toggleStatusAll }) => {
  const [name, setName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      alert('Please, write some characters')
      return
    }

    onAdd({ name })

    setName('')
  }
  
  const onChange = (e) => {
	setName(e.target.value)
	if (e.keyCode === 13) {
		onSubmit(e)
	}
  }
  
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
		<FaAngleDown
			className={tasks.filter(sortCompleted).length === tasks.length ? 'toggle-all' : 'toggle-all gray'} 
			onClick={toggleStatusAll}
		/>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={name}
          onChange={onChange}
        />
      </div>
    </form>
  )
}

export default Form
