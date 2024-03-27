import { useState } from "react"

function App() {
  const [ newItem, setNewItem ] = useState('')
  const [ todos, setTodos ] = useState([])

  function handleInput(e) {
    setNewItem(e.target.value)
  }

  function handleAdd(e) {
    e.preventDefault()
    setTodos(prev => {
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false
        }
      ]
    })
    setNewItem('')
  }

  function handleComplete(id) {
    setTodos(prev => {
      return prev.map(todo => todo.id !== id ? todo : {
        ...todo,
        completed: !todo.completed
      })
    })
  }

  function handleDelete(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <>
      <form onSubmit={handleAdd}>
        <div>
          <label>
            New Item
          </label>  
          <input type="text" value={newItem} onChange={handleInput}/>
        </div> 
        <button>Add</button> 
      </form>   
      <h1>Todo List</h1>
      <ul>
        {
          todos.map(todo => {
            return (
              <li key={todo.id}>
                <label className={todo.completed? 'completed' : ''}>
                  <input type="checkbox" onClick={() => handleComplete(todo.id)}/>
                  {todo.title}
                </label>
                <button onClick={() => handleDelete(todo.id)}>X</button>
              </li>
            )
          })
        }
        
      </ul>
    </>
  )
}

export default App
