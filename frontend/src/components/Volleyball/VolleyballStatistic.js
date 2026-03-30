import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from "react-router-dom";

// Component for the bar chart
// Component for the bar chart
// Component for the bar chart
function VolleyballStatisticGraph({ data }) {
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
        <Bar dataKey="rankingPoints" fill="#8884d8" />
        <Bar dataKey="playedMatches" fill="#82ca9d" />
        <Bar dataKey="wins" fill="#ffc658" />
      </BarChart>
    </div>
  );
}



// Main component for the volleyball statistics
function VolleyballStatistic() {
  const [volleyballStatistics, setVolleyballStatistics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('');
  

  useEffect(() => {
    const fetchStatistics = async () => {
      const res = await fetch("http://localhost:3000/volleyball/statistic", { credentials: "include" });
      const data = await res.json();
      setVolleyballStatistics(data);
    };
    fetchStatistics();
  }, []);

  const handleSort = (field) => {
    setSortBy(field);
  };

  // Sort the statistics based on the selected field
  const sortedStatistics = sortBy
    ? [...volleyballStatistics].sort((a, b) => b[sortBy] - a[sortBy])
    : volleyballStatistics;

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedStatistics.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='content-container'>
      <h1 className="table-title">Volleyball Statistics</h1>

      <div className="buttons-container">
        <Link to="/volleyball/players">
          <button className="show">Players</button>
        </Link>
        <Link to="/volleyball/teams">
          <button className="show">Teams</button>
        </Link>
      </div>
      <table className="statistics-table">
        <thead>
          <tr>
            <th className="table-header">Club</th>
            <th className="table-header" onClick={() => handleSort("rankingPoints")} title="Click to sort by Ranking Points">Ranking Points</th>
            <th className="table-header" onClick={() => handleSort("playedMatches")} title="Click to sort by Played Matches">Played Matches</th>
            <th className="table-header" onClick={() => handleSort("wins")} title="Click to sort by Wins">Wins</th>
            <th className="table-header" onClick={() => handleSort("losses")} title="Click to sort by Losses">Losses</th>
            <th className="table-header" onClick={() => handleSort("setsWon")} title="Click to sort by Sets Won">Sets Won</th>
            <th className="table-header" onClick={() => handleSort("setsLost")} title="Click to sort by Sets Lost">Sets Lost</th>
            <th className="table-header" onClick={() => handleSort("pointsWon")} title="Click to sort by Points Won">Points Won</th>
            <th className="table-header" onClick={() => handleSort("pointsLost")} title="Click to sort by Points Lost">Points Lost</th>
            <th className="table-header" onClick={() => handleSort("setRatio")} title="Click to sort by Set Ratio">Set Ratio</th>
            <th className="table-header" onClick={() => handleSort("pointRatio")} title="Click to sort by Point Ratio">Point Ratio</th>

          </tr>
        </thead>
        <tbody>
          {currentItems.map((statistic) => (
            <tr className="statistics-row" key={statistic._id}>
              <td>{statistic.club}</td>
              <td>{statistic.rankingPoints}</td>
              <td>{statistic.playedMatches}</td>
              <td>{statistic.wins}</td>
              <td>{statistic.losses}</td>
              <td>{statistic.setsWon}</td>
              <td>{statistic.setsLost}</td>
              <td>{statistic.pointsWon}</td>
              <td>{statistic.pointsLost}</td>
              <td>{statistic.setRatio}</td>
              <td>{statistic.pointRatio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <VolleyballStatisticGraph data={currentItems} />
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

export default VolleyballStatistic;
