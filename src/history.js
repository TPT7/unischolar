import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from './usercontext';

const HistoryPage = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${user.id}/questions`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
});

  const groupDataByQuestion = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      if (!groupedData[item.question_id]) {
        groupedData[item.question_id] = {
          question: item.question,
          comments: [],
        };
      }
      groupedData[item.question_id].comments.push({
        comment: item.comment,
        date: item.date,
      });
    });

    return groupedData;
  };

  const groupedData = groupDataByQuestion(data);

  return (
    <div className="content">
      <div id="history" className="section">
        <h2>Questions and Answers History</h2>
        <p>You can access all the previously answered questions here together with the comments that were shared on the question.</p>
        {Object.keys(groupedData).length === 0 ? (
          <p>No questions available.</p>
        ) : (
          Object.keys(groupedData).map((questionId) => (
            <div key={questionId} className="question-item">
              <p><strong>Question:</strong> {groupedData[questionId].question}</p>
              {groupedData[questionId].comments.map((commentItem, index) => (
                <p key={index}><strong>Comment:</strong> {commentItem.comment} <em>({new Date(commentItem.date).toLocaleString()})</em></p>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
