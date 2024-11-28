import React, { useState } from 'react';

const HomePage = () => {
  const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(false);

  const toggleComments = () => {
    console.log('Toggle Comments:', !isCommentSectionVisible); 
    setIsCommentSectionVisible(!isCommentSectionVisible);
  };

  return (
    <>
      <div className="content">
        <div id="home" className="section">
          <h2>Welcome to Uni Scholar</h2>
          <p>This platform allows students to ask questions and share answers. Feel free to explore and contribute to the community.</p>
        </div>
        <div id="questions" className="section">
          <h2>Questions</h2>
          <textarea id="questionInput" rows="4" placeholder="Type your question here..."></textarea>
          <div className="buttons">
            <button>Send</button>
            <button onClick={toggleComments}>Comment</button>
          </div>
          {isCommentSectionVisible && (
            <div className="comment-section" id="commentSection">
              <h3>Comments</h3>
              <div className="comment">
                <p>This is a sample comment.</p>
              </div>
              <textarea id="commentInput" rows="2" placeholder="Add a comment..."></textarea>
              <div className="buttons">
                <button>Add Comment</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
