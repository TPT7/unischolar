import React from 'react';


const HistoryPage = () => {
  return (
    <>
      <div className="content">
        <div id="home" className="section">
          <h2>Questions and Answers History</h2>
          <p>You can access all the previously answered questions here together with the comments that were shared on the question.</p>
        </div>
        <div id="home" className="section">
          <div id="questionsList"></div>
          <div id="commentsList"></div>
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
