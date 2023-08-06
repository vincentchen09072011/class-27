import { useState } from 'react'

import './App.css'

/*interface Todo {
  text: string;
  complete?:boolean;
  editing?:boolean;
  editInputValue:string
}


function App() {
  const [todo,setTodo] = useState<Todo[]>([
    {
      text:'learn react',
      
      editInputValue: '',
    },
    {
      text:'meet friend for lunch',

      editInputValue: '',
    },
    {
      text:'build a todo app',

      editInputValue: '',
    },
  ])
  const [inputvalue,setinputvalue] = useState('')
  const handleAddTodo = () => {
    if (!inputvalue) return;
    const nextTodo = [...todo, {text:inputvalue,complete:false, editInputValue:''}]
    setTodo(nextTodo)
    setinputvalue('')
  }
  const handleDeleteTodo = (index:number) => {
    const nextTodo = [...todo]
    nextTodo.splice(index,1)
    setTodo(nextTodo);
  }
  const handleEditInputChange = (index:number, value:string) => {
    const nextTodo = [...todo]
    nextTodo[index].editInputValue = value
    setTodo(nextTodo)
  }
  const handleStartEdit = (index:number) => {
    const nextTodo = [...todo]
    nextTodo[index].editing = true;
    if (nextTodo[index].editInputValue === '') (
      nextTodo[index].editInputValue = nextTodo[index].text
    )
    
    setTodo(nextTodo)
  }
  const handleStopEdit = (index:number) => {
    const nextTodo = [...todo]
    nextTodo[index].editing = false;
    setTodo(nextTodo)
  }
  const handleCompleteEditing = (index:number) => {
    const nextTodo = [...todo]
    nextTodo[index].editing = false;
    nextTodo[index].text = nextTodo[index].editInputValue;
    setTodo(nextTodo)
  }
  return (
    <div>
      <ul>
        {todo.map((todo,index) => {
          return <li key={index}>
            {
              todo.editing ? (
                <input value={todo.editInputValue}
                onChange={(e) => handleEditInputChange(index,e.target.value)}
                autoFocus={todo.editing}
                onBlur={() => handleStopEdit(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCompleteEditing(index)
                  }
                }}
                />
              ): (
                <span onClick={() => handleStartEdit(index)}>{todo.text}{' '}</span>
              )
            }
            <button onClick={() => handleDeleteTodo}>x</button>
          </li>
        })}
      </ul>
      <input type="text" onChange={(event) => setinputvalue(event.target.value)}/>
      <button onClick={handleAddTodo}>+</button>
    </div>
  )
}*/

interface KanBanBoard {
  columns: Todolist[]
}

interface Todolist {
  title:string;
  todos:Todo[]
  inputvalue?:string
  editing?: boolean;
  editInputValue:string
}
interface Todo {
  text:string;
  editing?:boolean;
  editInputValue:string
}

const initialBoard:KanBanBoard = {
  columns: [
    {
      title:'Todo',
      todos:[
        {
          text:'learn react',
          editInputValue:''
        },
        {
          text:'learn react',
          editInputValue:''
        },
        {
          text:'learn react',
          editInputValue:''
        },
      ],
      editInputValue:''
      
    },
    {
      title:'Doing',
      todos:[
        {
          text:'learn react',
          editInputValue:''
        },
        {
          text:'learn typescript',
          editInputValue:''
        },
        {
          text:'learn next.js',
          editInputValue:''
        },
      ],
      editInputValue:''
    },
    {
      title:'Done',
      todos:[
        {
          text:'learn react',
          editInputValue:''
        },
        {
          text:'learn typescript',
          editInputValue:''
        },
        {
          text:'learn next.js',
          editInputValue:''
        },
      ],
      editInputValue:''
    },
    
  ],
}

function App() {
  const [board,setBoard] = useState<KanBanBoard>(initialBoard)
  const handleDeleteItem = (columnIndex:number,todoIndex:number) => {
    const newboard = {...board}
    newboard.columns[columnIndex].todos.splice(todoIndex,1)
    setBoard(newboard)
  }
  const handleNewItemInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    columnIndex: number

  ) => {
    const newboard = {...board}
    newboard.columns[columnIndex].inputvalue = e.target.value
    setBoard(newboard)
  }
  const handleSubmitNewItem = (columnIndex:number) => {
    if (!board.columns[columnIndex].inputvalue) return;
    const newboard = {...board}
    newboard.columns[columnIndex].todos.push({
      text: newboard.columns[columnIndex].inputvalue!,
      editInputValue:''
    })
    newboard.columns[columnIndex].inputvalue = ''
    setBoard(newboard)
  }
  const handleMoveLeft = (
    columnIndex:number,
    todoIndex:number,
  )=> {
    if (columnIndex === 0) return;
    const newboard = {...board}
    const [item] = newboard.columns[columnIndex].todos.splice(todoIndex,1)
    newboard.columns[columnIndex-1].todos.push(item)
    setBoard(newboard)
  }
  const handleMoveRight = (
    columnIndex:number,
    todoIndex:number,
  ) => {
    if (columnIndex === board.columns.length - 1) return;
    const newboard = {...board}
    const [item] = newboard.columns[columnIndex].todos.splice(todoIndex,1)
    newboard.columns[columnIndex+1].todos.push(item)
    setBoard(newboard)
  }
  const handleStartEditingColumnTitle = (columnIndex:number) => {
    const newboard = {...board}
    const column = newboard.columns[columnIndex]
    column.editing = true;
    if (!column.editInputValue) {
      column.editInputValue = column.title
    }
    setBoard(newboard)
  }
  
  const handleStopEditColumnTitle = (columnIndex: number) => {
    const newboard = {...board}
    newboard.columns[columnIndex].editing = false;
    setBoard(newboard)
  }
  const handleEditColumnTitleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    columnIndex:number,
  ) => {
    const newboard = {...board}
    newboard.columns[columnIndex].editInputValue = e.target.value;
    setBoard(newboard)
  }
  const handleEditColumnTitleSubmit = (columnIndex:number) => {
    const newboard = {...board}
    const column = newboard.columns[columnIndex]
    column.title = column.editInputValue
    column.editing = false
    setBoard(newboard)
  }
  const handleStartEditingTodo = (columnIndex:number, todoIndex:number) => {
    const newboard = {...board}
    const todo = newboard.columns[columnIndex].todos[todoIndex]
    todo.editing = true;
    if (!todo.editInputValue) {
      todo.editInputValue = todo.text
    }
    setBoard(newboard)
  }
  const handleStopEditTodo = (columnIndex: number,todoIndex:number) => {
    const newboard = {...board}
    newboard.columns[columnIndex].todos[todoIndex].editing = false;
    setBoard(newboard)
  }
  const handleEditTodoInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    columnIndex:number,
    todoIndex:number
  ) => {
    const newboard = {...board}
    newboard.columns[columnIndex].todos[todoIndex].editInputValue = e.target.value;
    setBoard(newboard)
  }
  const handleTodoEditSave = (columnIndex:number, todoIndex:number) => {
    const newboard = {...board}
    const todo = newboard.columns[columnIndex].todos[todoIndex]
    todo.text = todo.editInputValue
    todo.editing = false
    setBoard(newboard)
  }
  const next = '>'
  const prev = '<'
  return (
  <div className=''>
    {
      board.columns.map((column,columnIndex) => {
        return (
          <div key={columnIndex}>
            {
              column.editing ? (
                <input onChange={(e) => handleEditColumnTitleInputChange(e,columnIndex)} 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEditColumnTitleSubmit(columnIndex)
                }} 
                value={column.editInputValue} 
                autoFocus={column.editing} 
                onBlur={() => handleStopEditColumnTitle(columnIndex)} /> 
              ) : (
                <h2 onClick={() => handleStartEditingColumnTitle(columnIndex)}>{column.title}</h2>
              )
            }
            
            <ul className=''>
              {column.todos.map((todo,todoIndex) => {
                return <div className=''><li className='' key={todoIndex}>
                  <div className=''>
                    <button disabled={columnIndex === 0} onClick={() => handleMoveLeft(columnIndex,todoIndex)}>{prev}</button>
                    {
                      todo.editing ? (
                        <input onChange={(e)=> handleEditTodoInputChange(e,columnIndex,todoIndex)}
                        value={todo.editInputValue}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleTodoEditSave(columnIndex,todoIndex)
                        }}
                        autoFocus={todo.editing}
                        onBlur={() => handleStopEditTodo(columnIndex,todoIndex)} />
                      ) : (
                        <span onClick={() => handleStartEditingTodo(columnIndex,todoIndex)}>{' '}{todo.text}{' '}</span>
                      )
                    }
                    
                    <button disabled={columnIndex === board.columns.length -1 } onClick={() => handleMoveRight(columnIndex,todoIndex)}>{next}</button>
                  
                    <button className='' onClick={() => handleDeleteItem(columnIndex,todoIndex)}>x</button>
                  </div>
                  
                </li>
                </div>
              })}
            </ul>
            <div className=''>
              <input className='' placeholder='Enter some value' onChange={(e) => handleNewItemInputChange(e,columnIndex)} onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmitNewItem(columnIndex)
              }} />
            </div>
            
            
          </div>
        )
      })
    }
  </div>
  )
}

export default App
