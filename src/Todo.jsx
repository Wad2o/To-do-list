import React, { useState, useEffect } from "react";
import './todo.css';

function Todo() {
    
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    function getTodos  (key){
        try {
            const  todo = window.localStorage.getItem(key);
            return todo ? JSON.parse(todo) : [];
        } catch (error) {
            return [];
        }
    }

     const [todos, setTodos] = useState(()=>getTodos('todos'));
    const [input, setInput] = useState("");
    const [selectedDay, setSelectedDay] = useState("monday");

    
    useEffect(() => {
        console.log("Saving to localStorage:", todos);
        try {
            window.localStorage.setItem('todos', JSON.stringify(todos));
        } catch (e) {
           console.log("storage  full");
        }
    }, [todos]);

  

    
    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleAdd = () => {
        if (input.trim() === "") return;

       
        const newTask = {
            id: Date.now(),
            text: input.trim(),
            day: selectedDay
            
        };

       
        setTodos(prev => [...prev, newTask]);
        setInput("");
    };

    const handleDelete = (id) => {
       
        setTodos(prev => prev.filter(task => task.id !== id));
    };

 

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div > 
        <div id="body"> 
            <div id="allinp">
               <div id="inp"> <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id="in"
                    placeholder="Entrez une tâche"
                />
               
                <select id="day" value={selectedDay} onChange={handleDayChange}>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                </select></div> <button onClick={handleAdd}>Ajouter</button>
            </div>


           <div className="days-grid">
            { daysOfWeek
              .filter(day => todos.some(task => task.day.toLowerCase() === day.toLowerCase()))
              .map(day => (
                <div key={day} id={day} className="day-column">
                  <h3>{day}</h3>
                  <ul>
                    {todos
                      .filter(task => task.day.toLowerCase() === day.toLowerCase())
                      .map(task => (
                        <li className="text" key={task.id} id={task.id}>

                            <span onClick={() => handleDelete(task.id)}  >{task.text}</span>
                          
                          
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
        </div>
        </div>

    );
}

export default Todo
