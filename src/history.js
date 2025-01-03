import React, { useEffect, useState } from 'react';
import axios from 'axios';  

const HistoryPage = () => {
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState({});
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBanner, setShowBanner] = useState(false); 
  const [bannerMessage, setBannerMessage] = useState('');

  useEffect(() => {
    //function fetchs questions from the database
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  //function submits comments to the database
  const handleCommentSubmit = async (question_id) => {
    if (comment.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/api/comments', {
          question_id,
          comment,
        });

        setComment('');
        const newComment = response.data;
        setComments((prevComments) => ({
          ...prevComments,
          [question_id]: [...(prevComments[question_id] || []), newComment.comment],
        }));

        // Show success banner
        setBannerMessage('Your answer has been submitted!');
        setShowBanner(true);
        setTimeout(() => {
          setShowBanner(false);
        }, 3000);  // Hide banner after 3 seconds

        console.log('Comment submitted');
        
      } catch (err) {
        setError('Error submitting comment');
        setBannerMessage('Error submitting your answer, please try again.');
        setShowBanner(true);
        setTimeout(() => {
          setShowBanner(false);
        }, 3000);  // Hide banner after 3 seconds
        console.error(err);
      }
    } else {
      console.log('Comment cannot be empty');
    }
  };

  return (
    <div className="content">
      {/* Display success or error banner if showBanner is true */}
      {showBanner && (
        <div className="banner">
          <p>{bannerMessage}</p>
        </div>
      )}

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
              <h3>Question: {question.question}</h3>

              {comments[question.question_id] && (
                <div>
                  <h4>Answers: </h4>
                  {comments[question.question_id].map((cmt, idx) => (
                    <p key={idx}>{cmt}</p>
                  ))}
                </div>
              )}

              <textarea
                id="questionInput"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your answer..."
                rows="4"
              ></textarea>
              <div className="buttons">
                <button onClick={() => handleCommentSubmit(question.question_id)}>
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
