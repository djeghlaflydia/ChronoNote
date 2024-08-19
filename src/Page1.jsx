import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './Page1.css';

function Page1() {
    const navigate = useNavigate();

    const goToFirstPage = () => {
        navigate('/'); // Navigue vers la page d'accueil (App)
    }

    const [tasks, setTasks] = useState(() => {
        // Récupérer les tâches depuis le localStorage si elles existent
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        // Sauvegarder les tâches dans le localStorage à chaque fois qu'elles changent
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value); // Mettre à jour le texte dans la boîte de saisie
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div>
            <div className="to-do-list">
                <h1>To-Do-List</h1>

                <div>
                    <input
                        type="text" placeholder="Enter a task..."
                        value={newTask} onChange={handleInputChange} />
                    <button className="add-button" onClick={addTask}>Add</button>
                </div>
                <ol>
                    {tasks.map((task, index) =>
                        <li key={index}>
                            <span className="text">{task}</span>
                            {/* delete button */}
                            <button className="delete-button"
                                    onClick={() => deleteTask(index)}>
                                🗑
                            </button>

                            {/* moveUp button */}
                            <button className="move-button" id="up"
                                    onClick={() => moveTaskUp(index)}>
                                👆🏼
                            </button>

                            {/* moveDown button */}
                            <button className="move-button" id="down"
                                    onClick={() => moveTaskDown(index)}>
                                👇🏼
                            </button>

                        </li>
                    )}
                </ol>

            </div>

            <button className="Back" onClick={goToFirstPage}>Back</button>
        </div>
    );
}


export default Page1;
