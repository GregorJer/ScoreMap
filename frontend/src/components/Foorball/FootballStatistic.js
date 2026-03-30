import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from "react-router-dom";

// Component for the bar chart
function FootballStatisticGraph({ data }) {
  return (
    <div className="statistic-graph">
      <BarChart
        width={800} // Increase this to increase the width of the graph
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
        <Bar dataKey="playedMatches" fill="#82ca9d" />
        <Bar dataKey="wins" fill="#ffc658" />
      </BarChart>
    </div>
  );
}

// Main component for the football statistics
function FootballStatistic() {
  const [footballStatistics, setFootballStatistics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchStatistics = async () => {
      const res = await fetch("http://localhost:3000/football/statistic", { credentials: "include" });
      const data = await res.json();
      setFootballStatistics(data);
    };
    fetchStatistics();
  }, []);

  const handleSort = (field) => {
    setSortBy(field);
  };

  // Sort the statistics based on the selected field
  const sortedStatistics = sortBy
    ? [...footballStatistics].sort((a, b) => b[sortBy] - a[sortBy])
    : footballStatistics;

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedStatistics.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='content-container'>
      <h1 className="table-title">Football Statistics</h1>

      <div className="buttons-container">
        <Link to="/football/players">
          <button className="show">Players</button>
        </Link>
        <Link to="/football/teams">
          <button className="show">Teams</button>
        </Link>
      </div>
      <table className="statistics-table">
        <thead>
          <tr>
            <th className="table-header">Position</th>
            <th className="table-header">Club</th>
            <th className="table-header" onClick={() => handleSort("playedMatches")} title="Click to sort by Played Matches">Played Matches</th>
            <th className="table-header" onClick={() => handleSort("wins")} title="Click to sort by Wins">Wins</th>
            <th className="table-header" onClick={() => handleSort("draw")} title="Click to sort by Draws">Draws</th>
            <th className="table-header" onClick={() => handleSort("losses")} title="Click to sort by Losses">Losses</th>
            <th className="table-header" onClick={() => handleSort("goalDifference")} title="Click to sort by Goal Difference">Goal Difference</th>
            <th className="table-header" onClick={() => handleSort("points")} title="Click to sort by Points">Points</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((statistic) => (
            <tr className="statistics-row" key={statistic._id}>
              <td>{statistic.position}</td>
              <td>{statistic.club}</td>
              <td>{statistic.playedMatches}</td>
              <td>{statistic.wins}</td>
              <td>{statistic.draw}</td>
              <td>{statistic.losses}</td>
              <td>{statistic.goalDifference}</td>
              <td>{statistic.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <FootballStatisticGraph data={currentItems} />
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
}

export default FootballStatistic;
