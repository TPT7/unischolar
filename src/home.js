import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    try {
      // Submit the question
      const questionResponse = await axios.post('http://localhost:5000/api/questions', { question });
      if (questionResponse.status === 201) {
        alert('Question and comment saved successfully');
        setQuestion(''); // Clear the question input

        // Submit the comment
        const questionId = questionResponse.data.id;
        const commentResponse = await axios.post('http://localhost:5000/api/comments', {
          question_id: questionId,
          comment,
        });
        if (commentResponse.status === 201) {
          setComment(''); // Clear the comment input
        } else {
          alert('Failed to save comment');
        }
      } else {
        alert('Failed to save question');
      }
    } catch (error) {
      console.error('Error saving question or comment:', error);
      alert('An error occurred while saving the question or comment');
    }
  };

  return (
    <>
      <div className="content">
        <div id="home" className="section">
          <h2>Welcome to Uni Scholar</h2>
          <p>This platform allows students to ask questions and share answers. Feel free to explore and contribute to the community.</p>
        </div>
        <div id="questions-comments" className="section">
          <h2>Ask a Question and Add a Comment</h2>
          <textarea
            id="questionInput"
            rows="4"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
          <textarea
            id="commentInput"
            rows="2"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="buttons">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
