import React, { useState, useEffect } from 'react';
import './App.css';
import Parse from 'parse';

// Initialize Parse
Parse.initialize("ZzDXU54EnG2rOv07Tq5jjDbRAboa4Bb6JKStFNBH", "CQODbpbCk2IMA8Lofmh53vMQU6ocE3Urv6JT0mSv");
Parse.serverURL = 'https://parseapi.back4app.com/';


const Task = Parse.Object.extend("Task");


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Fetch tasks from Back4App on component mount
  useEffect(() => {
    const query = new Parse.Query(Task);
    query.find()
      .then((results) => {
        const taskNames = results.map(result => result.get('name'));
        setTasks(taskNames);
      })
      .catch((error) => {
        console.error("Error fetching tasks: ", error);
      });
  }, []);

  // Create
  const addTask =  (e) => {
    e.preventDefault(); 
    if (newTask.trim() !== '') {
      const task = new Task();
      task.set("name", newTask.trim());

      task.save()
        .then((task) => {
          setTasks([...tasks, task.get('name')]);
          setNewTask('');
        })
        .catch((error) => {
          console.error("Error saving task: ", error);
        });
    }else {
      console.error("User not authenticated");
  }
} ;

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    addTask(e);
  }
};

  // Update
  const updateTask = () => {
    if (newTask.trim() !== '' && editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask.trim();
      setTasks(updatedTasks);
      setNewTask('');
      setEditIndex(null);
    }
  };

  // Delete
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={addTask}>
      <input
        type="text"
        value={newTask}
        onKeyPress={handleKeyPress}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      {editIndex === null ? (
        <button onClick={addTask}>Add</button>
      ) : (
        <button onClick={updateTask}>Update</button>
      )}</form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => { setNewTask(task); setEditIndex(index); }}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

