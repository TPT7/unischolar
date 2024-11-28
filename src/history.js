import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoryPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="content">
        <div id="history" className="section">
          <h2>Questions and Answers History</h2>
          <p>You can access all the previously answered questions here together with the comments that were shared on the question.</p>
          {data.length === 0 ? (
            <p>No questions available.</p>
          ) : (
            data.map((item, index) => (
              <div key={index} className="question-item">
                <p><strong>Question:</strong> {item.question}</p>
                {item.comment && (
                  <p><strong>Comment:</strong> {item.comment} <em>({new Date(item.date).toLocaleString()})</em></p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
