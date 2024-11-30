import React, { useState } from 'react';
import axios from 'axios';
// import UserContext from './usercontext';

const HomePage = () => {
  // const { user } = useContext(UserContext);
  const [question, setQuestion] = useState('');
  // const [comment, setComment] = useState('');
  const [question_id, setQuestionId] = useState(null);

  const handleQuestion = async () => {
    try {
      console.log('Sending question:', { question });
      const response = await axios.post('http://localhost:5000/api/questions', { question });
      setQuestion(''); // Clear the question input
      setQuestionId(response.data.id); // Store the ID of the submitted question
      console.log('Question saved, ID:', response.data.id);
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  // const handleComment = async () => {
  //   try {
  //     console.log('Sending comment:', { comment});
  //     await axios.post('http://localhost:5000/api/comments', { comment});
  //     setComment(''); // Clear the comment input
  //     console.log('Comment saved');
  //   } catch (error) {
  //     console.error('Error saving comment:', error);
  //   }
  // };

  const handleSubmit = async () => {
    if (question) {
      await handleQuestion();
    }
    // if (comment && question_id) {
    //   await handleComment();
    // }
  };

  return (
    <div className="content">
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
        {/* <textarea
          id="commentInput"
          rows="2"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea> */}
        <div className="buttons">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;