import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoryPage = () => {
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState({}); // State to store comments for each question
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the question(s) from the backend API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data); // Assuming it returns an array of questions
        setLoading(false);
      } catch (err) {
        setError('Error fetching questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Handle comment submission
  const handleCommentSubmit = async (question_id) => {
    if (comment.trim()) {
      try {
        // Send the comment to the server along with the question ID and user ID
        const response = await axios.post('http://localhost:5000/api/comments', {
          question_id,
          comment,
        });

        // Clear the comment input after submission
        setComment('');

        // Update the comments state to display the new comment
        const newComment = response.data;
        setComments((prevComments) => ({
          ...prevComments,
          [question_id]: [...(prevComments[question_id] || []), newComment.comment],
        }));

        console.log('Comment submitted');
      } catch (err) {
        setError('Error submitting comment');
        console.error(err);
      }
    } else {
      alert('Comment cannot be empty');
    }
  };

  return (
    <div className="content">
      <div id="history" className="section">
        <h2>Questions and Answers</h2>
        <p>You can view all the questions posted and add your comments here.</p>
      </div>
      <div id="history" className="section">
        {loading ? (
          <p>Loading questions...</p>
        ) : error ? (
          <p>{error}</p>
        ) : questions.length === 0 ? (
          <p>No questions available.</p>
        ) : (
          questions.map((question) => (
            <div key={question.question_id} className="section">
              {/* Displaying the question */}
              <h3>Question: {question.question}</h3>

              {/* Display the submitted comments if they exist */}
              {comments[question.question_id] && (
                <div>
                  <h4>Answers: </h4>
                  {comments[question.question_id].map((cmt, idx) => (
                    <p key={idx}>{cmt}</p>
                  ))}
                </div>
              )}

              {/* Comment form */}
              <textarea
                id="questionInput"
                value={comment}
                onChange={(e) => setComment(e.target.value)} // Update comment state
                placeholder="Write your answer..."
                rows="4"
              ></textarea>
              <div className="buttons">
                <button
                  onClick={() => handleCommentSubmit(question.question_id)} // Submit comment for the specific question
                >
                  Submit Answer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;