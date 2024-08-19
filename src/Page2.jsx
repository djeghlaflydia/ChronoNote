import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // Assurez-vous d'avoir installé cette dépendance
import 'react-calendar/dist/Calendar.css'; // Import des styles du calendrier
import './Page2.css';

function Page2() {
    const navigate = useNavigate();

    const goToFirstPage = () => {
        navigate('/'); // Navigue vers la page d'accueil (App)
    }

    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState({});
    const [newEvent, setNewEvent] = useState("");

    // Charger les événements depuis localStorage lors du chargement du composant
    useEffect(() => {
        const savedEvents = localStorage.getItem('events');
        if (savedEvents) {
            try {
                setEvents(JSON.parse(savedEvents));
            } catch (error) {
                console.error("Failed to parse events from localStorage:", error);
            }
        }
    }, []);

    // Sauvegarder les événements dans localStorage à chaque mise à jour
    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleEventChange = (event) => {
        setNewEvent(event.target.value);
    };

    const handleAddEvent = () => {
        if (!newEvent.trim()) return; // Ignore les entrées vides
        const dateKey = date.toDateString();
        setEvents((prevEvents) => {
            const updatedEvents = {
                ...prevEvents,
                [dateKey]: [...(prevEvents[dateKey] || []), newEvent],
            };
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Sauvegarde immédiate
            return updatedEvents;
        });
        setNewEvent("");
    };

    const handleRemoveEvent = (eventToRemove) => {
        const dateKey = date.toDateString();
        setEvents((prevEvents) => {
            const updatedEvents = {
                ...prevEvents,
                [dateKey]: prevEvents[dateKey].filter(event => event !== eventToRemove),
            };
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Sauvegarde immédiate
            return updatedEvents;
        });
    };

    const getEventsForDate = (date) => {
        return events[date.toDateString()] || [];
    };

    return (
        <div>
            <button className="Back" onClick={goToFirstPage}>Back</button>
            <div className="page2">
                <h1>Your Agenda</h1>
                <div className="calendar-container">
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                    />
                </div>
                <div className="events-container">
                    <h2>Events for {date.toDateString()}</h2>
                    <ul>
                        {getEventsForDate(date).map((event, index) => (
                            <li key={index} onClick={() => handleRemoveEvent(event)}>
                                {event}
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={newEvent}
                        onChange={handleEventChange}
                        placeholder="Add new event"
                    />
                    <button id="addEvent" onClick={handleAddEvent}>Add Event</button>
                </div>
            </div>
        </div>
    );
}

export default Page2;
