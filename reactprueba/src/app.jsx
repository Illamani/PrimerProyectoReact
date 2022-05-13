import React,{ Fragment, useState, useRef, useEffect } from "react";
import { TodoList } from "./components/toDoList";

const KEY = "todoApp.todos"

export function App(){
    const todoTaskRef = useRef();
    const [todos, setTodos] = useState([
        {id: 1, task: "Tarea 1",completed:false}
    ]);

    
    useEffect(()=>{
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos){
            setTodos(storedTodos);
        }
    },[])

    useEffect(() =>{
        localStorage.setItem(KEY,JSON.stringify(todos));
    },[todos])


    const toggleTodo = (id)=>{
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos)
    }

    const handleToDoAdd = () =>{
        const task = todoTaskRef.current.value;
        if (task === "") return;

        setTodos((prevTodos) => {
            return [...prevTodos,{id:"", task,completed:false}]
        });

        todoTaskRef.current.value = null;
    }

    const handleClearAll = () =>{
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos)
    }
    return (
    <Fragment>
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
        <button onClick={handleToDoAdd}>+</button>
        <button onClick={handleClearAll}>-</button>
        <div>
            Te quedan {todos.filter((todo)=> !todo.completed).length} tareas por 
            terminar
        </div>
    </Fragment>
    );
}