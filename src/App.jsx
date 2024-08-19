import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';

function App() {
    const navigate = useNavigate();

    const goToPage1 = () => {
        navigate('/page1');
    };

    const goToPage2 = () => {
        navigate('/page2');
    };

    return (
        <div className="container">
            <h2>Welcome, dear visitor!</h2>
            <h3>On ChronoNote, you'll find everything you need to help you stay organized and manage your tasks effectively.</h3>
            <div className="button-container">
                <button onClick={goToPage1}>Your TODO list</button>
                <button onClick={goToPage2}>Your Agenda</button>
            </div>
        </div>
    );
}


function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/page1" element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
            </Routes>
        </Router>
    );
}

export default Main;
