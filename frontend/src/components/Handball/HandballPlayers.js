import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HandballPlayers() {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [handball_players, setHandballPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Display 5 items per page
  const [maxPageButtonsToShow] = useState(5); // Limit the number of displayed page buttons
  const [visiblePageButtons, setVisiblePageButtons] = useState([]);

  useEffect(() => {
    const getProfile = async function () {
      const res = await fetch('http://localhost:3000/handball/players', {
        credentials: 'include'
      });
      const data = await res.json();
      setHandballPlayers(data);
    };
    getProfile();
  }, []);

  const sortedAndFilteredPlayers = handball_players
    .filter((player) => {
      return (
        player.team.toLowerCase().includes(filter.toLowerCase()) ||
        player.name.toLowerCase().includes(filter.toLowerCase()) ||
        player.surname.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === 'goalsPerMatch') {
        return parseFloat(b.goalsPerMatch) - parseFloat(a.goalsPerMatch);
      } else {
        return parseFloat(b[sortBy]) - parseFloat(a[sortBy]);
      }
    });

  const totalPlayers = sortedAndFilteredPlayers.length;
  const totalPages = Math.ceil(totalPlayers / itemsPerPage);
  const playersToShow = sortedAndFilteredPlayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate the visible page buttons
  useEffect(() => {
    const totalButtons = Math.min(maxPageButtonsToShow, totalPages);
    const middleButtonIndex = Math.ceil(totalButtons / 2);
    let startButton = currentPage - middleButtonIndex + 1;
    if (startButton < 1) startButton = 1;
    if (startButton + totalButtons > totalPages)
      startButton = totalPages - totalButtons + 1;
    const visibleButtons = [...Array(totalButtons)].map(
      (_, index) => startButton + index
    );
    setVisiblePageButtons(visibleButtons);
  }, [currentPage, totalPages, maxPageButtonsToShow]);

  return (
    <div>
      <h1 className="table-title">Handball Players</h1>
      <br />

      <div className="content-container">
        <div className="buttons-container">
          <Link to="/handball/teams">
            <button className="show">Teams</button>
          </Link>
          <Link to="/handball/statistic">
            <button className="show">Statistics</button>
          </Link>
        </div>
        <br />

        <div className="filter-sort-container">
          <div className="sort-select">
            <label htmlFor="sort-by">Sort by:</label>
            <select id="sort-by" onChange={(e) => setSortBy(e.target.value)}>
              <option value="">--Select--</option>
              <option value="goals">Goals</option>
              <option value="shots">Shots</option>
              <option value="matches">Matches</option>
              <option value="goalsPerMatch">Goals per Match</option>
            </select>
          </div>

          <div className="filter-container">
            <label htmlFor="filter-by-team">Filter:</label>
            <input
              type="text"
              id="filter-by-team"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <table className="players-table">
          <thead>
            <tr>
              <th className="table-header">Rank</th>
              <th className="table-header">Name</th>
              <th className="table-header">Surname</th>
              <th className="table-header">Team</th>
              <th className="table-header">Matches</th>
              <th className="table-header">Goals</th>
              <th className="table-header">Shots</th>
              <th className="table-header">Goals per Match</th>
            </tr>
          </thead>
          <tbody>
            {playersToShow.map((player, index) => (
              <tr className="player-row" key={`${player.id}_${index}`}>
                <td>{player.number}</td>
                <td>{player.name}</td>
                <td>{player.surname}</td>
                <td>{player.team}</td>
                <td data-matches>{player.matches}</td>
                <td data-goals>{player.goals}</td>
                <td data-shots>{player.shots}</td>
                <td data-goalsPerMatch>{player.goalsPerMatch}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <div className="pagination-container">
                    <div className='palyers-pagination'>
          {currentPage > 1 && (
            <button
              className="page-button"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          )}

          {currentPage > maxPageButtonsToShow && (
            <button
              className="page-button"
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
          )}

          {currentPage > maxPageButtonsToShow + 1 && (
            <span className="page-ellipsis">...</span>
          )}

          {visiblePageButtons.map((pageNumber) => (
            <button
              className={
                pageNumber === currentPage
                  ? 'page-button active'
                  : 'page-button'
              }
              key={`page_number_${pageNumber}`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          {currentPage + maxPageButtonsToShow < totalPages && (
            <span className="page-ellipsis">...</span>
          )}

          {currentPage < totalPages && (
            <button
              className="page-button"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          )}

          {currentPage < totalPages && (
            <button
              className="page-button"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
    
        <br />
        </div>
      </div>
    </div>
  );
}

export default HandballPlayers;
