import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const WelcomePage = () => {
    const navigate = useNavigate(); 

    const handleGetStarted = () => {
        navigate('/login');  
    };

    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <img 
                    src="https://img.icons8.com/ios/452/graduation-cap.png" 
                    alt="Graduation Cap" 
                    className="graduation-cap" 
                />
                <h2>Welcome to Uni Scholar</h2>
                <p>Uni Scholar is the platform where students can ask questions, get answers, and share knowledge. Join us now!</p>

                <button onClick={handleGetStarted} className="get-started-button">
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default WelcomePage;
