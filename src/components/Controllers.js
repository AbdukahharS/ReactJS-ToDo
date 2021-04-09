const Controllers = ({ tasks, sortCompleted, editFilter, deleteCompleted}) => {
  return (
    <div className="controllers">
		<p>{ tasks.length - tasks.filter(sortCompleted).length } items left</p>
		<div className="filters">
			<button id="all" onClick={() => editFilter('all')} className="current">All</button>
			<button id="active" onClick={() => editFilter('active')}>Actve</button>
			<button id="completed" onClick={() => editFilter('completed')}>Completed</button>
		</div>
		<button 
			onClick={() => deleteCompleted()}
			className={tasks.filter(sortCompleted).length !== 0 ? 'clr' : 'clr hide'}
		>
			Clear Completed
		</button>
	</div>
  )
}

export default Controllers
