import React, { useState } from 'react';
import axios from 'axios'; 

const HomePage = () => {
  const [question, setQuestion] = useState('');
  const [showBanner, setShowBanner] = useState(false);  

  const handleQuestion = async () => {
    try {
      const userId = localStorage.getItem('user_id'); 

      if (!userId) {
        console.error('User not logged in!');
        return;
      }

      const questionData = {
        question,
        user_id: userId, 
      };

      console.log('Sending question:', questionData);
      
      const response = await axios.post('http://localhost:5000/api/questions', questionData);
      setQuestion(''); 
      console.log('Question saved, ID:', response.data.id);

    
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving question:', error);

      alert('Error submitting your question. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (question) {
      await handleQuestion();
    }
  };

  return (
    <div className="content">
      {showBanner && (
        <div className="banner">
          <p>Question successfully sent!</p>
        </div>
      )}

      <div id="home" className="section">
        <h2>Welcome to Uni Scholar</h2>
        <p>This platform allows students to ask questions and share answers. Feel free to explore and contribute to the community.</p>
      </div>
      <div id="questions-comments" className="section">
        <h2>Ask a Question</h2>
        <textarea
          id="questionInput"
          rows="4"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <div className="buttons">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
