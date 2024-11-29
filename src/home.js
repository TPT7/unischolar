import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from './usercontext';

const HomePage = () => {
  const { user } = useContext(UserContext);
  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');
  const [questionId, setQuestionId] = useState(null);

  const handleQuestion = async () => {
    try {
      console.log('Sending question:', { question, userId: user.id });
      const response = await axios.post('http://localhost:5000/api/questions', { question, userId: user.id });
      setQuestion(''); // Clear the question input
      setQuestionId(response.data.id); // Store the ID of the submitted question
      console.log('Question saved, ID:', response.data.id);
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  const handleComment = async () => {
    try {
      console.log('Sending comment:', { comment, questionId, userId: user.id });
      await axios.post('http://localhost:5000/api/comments', { comment, questionId, userId: user.id });
      setComment(''); // Clear the comment input
      console.log('Comment saved');
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const handleSubmit = async () => {
    if (question) {
      await handleQuestion();
    }
    if (comment && questionId) {
      await handleComment();
    }
  };

  return (
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
  );
};

export default HomePage;
