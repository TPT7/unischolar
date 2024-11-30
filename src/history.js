import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from './usercontext';

const HistoryPage = () => {
  const { user } = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const [comment, setComment] = useState(''); // State to store the current comment input
  const [loading, setLoading] = useState(true); // Loading state for questions
  const [error, setError] = useState(null); // Error state for fetching questions

  // Fetch questions from the backend API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data); // Store the fetched questions
        setLoading(false);
      } catch (err) {
        setError('Error fetching questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Handle comment submission
  const handleCommentSubmit = async (questionId) => {
    if (comment.trim()) {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/comments',
          {
            question_id: questionId,
            user_id: user.id, // Send the current user ID
            comment: comment.trim(),
          }
        );
        // Update the comment section by appending the new comment
        const updatedQuestions = questions.map((q) =>
          q.id === questionId
            ? { ...q, comments: [...q.comments, response.data] }
            : q
        );
        setQuestions(updatedQuestions);
        setComment(''); // Clear the comment text area
      } catch (err) {
        console.error('Error submitting comment:', err);
        setError('Error submitting comment');
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

        {loading ? (
          <p>Loading questions...</p>
        ) : error ? (
          <p>{error}</p>
        ) : questions.length === 0 ? (
          <p>No questions available.</p>
        ) : (
          questions.map((question) => (
            <div key={question.id} className="question-item">
              <h3>{question.title}</h3> {/* Display the question title */}
              <p>{question.description}</p> {/* Display the question description */}

              {/* Display the existing comments */}
              <div className="comments-section">
                {question.comments && question.comments.length > 0 ? (
                  question.comments.map((commentItem, index) => (
                    <div key={index} className="comment">
                      <p><strong>Comment:</strong> {commentItem.comment}</p>
                      <em>({new Date(commentItem.date).toLocaleString()})</em>
                    </div>
                  ))
                ) : (
                  <p>{question.question}</p>
                )}
              </div>

              {/* Comment form */}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)} // Update comment state on change
                placeholder="Write a comment..."
                rows="4"
                className="comment-textarea"
              ></textarea>
              <button onClick={() => handleCommentSubmit(question.id)} className="submit-comment">
                Submit Comment
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
