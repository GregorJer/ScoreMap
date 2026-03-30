import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from "react-router-dom";
import '../styles/style.css';

function HandballStatisticGraph({ data }) {
  return (
    <div className="statistic-graph">
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="club" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="points" fill="#8884d8" />
        <Bar dataKey="matchesPlayed" fill="#82ca9d" />
        <Bar dataKey="matchesWon" fill="#ffc658" />
      </BarChart>
    </div>
  );
}

const HandballStatistic = () => {
  const [rankings, setRankings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/handball/statistic')  // Adjust the URL according to your server
      .then(response => response.json())
      .then(data => setRankings(data));
  }, []);

  const handleSort = (field) => {
    setSortBy(field);
  };

  // Sort the statistics based on the selected field
  const sortedStatistics = sortBy
    ? [...rankings].sort((a, b) => b[sortBy] - a[sortBy])
    : rankings;

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedStatistics.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='content-container'>
      <h1 className="table-title">Handball Statistics</h1>
      <div className="buttons-container">
        <Link to="/handball/players">
          <button className="show">Players</button>
        </Link>
        <Link to="/handball/teams">
          <button className="show">Teams</button>
        </Link>
      </div>
      <table className="statistics-table">
        <thead>
          <tr>
            <th className="table-header" onClick={() => handleSort("position")} title="Click to sort by Position">Position</th>
            <th className="table-header">Club</th>
            <th className="table-header" onClick={() => handleSort("matchesPlayed")} title="Click to sort by Matches Played">Matches Played</th>
            <th className="table-header" onClick={() => handleSort("matchesWon")} title="Click to sort by Matches Won">Matches Won</th>
            <th className="table-header" onClick={() => handleSort("matchesDrawn")} title="Click to sort by Matches Drawn">Matches Drawn</th>
            <th className="table-header" onClick={() => handleSort("matchesLost")} title="Click to sort by Matches Lost">Matches Lost</th>
            <th className="table-header" onClick={() => handleSort("goalsFor")} title="Click to sort by Goals For">Goals For</th>
            <th className="table-header" onClick={() => handleSort("goalsAgainst")} title="Click to sort by Goals Against">Goals Against</th>
            <th className="table-header" onClick={() => handleSort("goalDifference")} title="Click to sort by Goal Difference">Goal Difference</th>
            <th className="table-header" onClick={() => handleSort("points")} title="Click to sort by Points">Points</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(ranking => (
            <tr className="statistics-row" key={ranking._id}>
              <td>{ranking.position}</td>
              <td>{ranking.club}</td>
              <td>{ranking.matchesPlayed}</td>
              <td>{ranking.matchesWon}</td>
              <td>{ranking.matchesDrawn}</td>
              <td>{ranking.matchesLost}</td>
              <td>{ranking.goalsFor}</td>
              <td>{ranking.goalsAgainst}</td>
              <td>{ranking.goalDifference}</td>
              <td>{ranking.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <HandballStatisticGraph data={currentItems} />
      <br></br>
      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedStatistics.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <br></br>
    </div>
  );
};

export default HandballStatistic;
