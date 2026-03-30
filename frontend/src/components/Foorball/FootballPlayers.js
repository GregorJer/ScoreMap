import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FootballPlayers() {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [football_players, setFootballPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Display 5 items per page
  const [maxPageButtonsToShow] = useState(5); // Limit the number of displayed page buttons
  const [visiblePageButtons, setVisiblePageButtons] = useState([]);

  useEffect(() => {
    const getProfile = async function () {
      const res = await fetch('http://localhost:3000/football/players', {
        credentials: 'include'
      });
      const data = await res.json();
      setFootballPlayers(data);
    };
    getProfile();
  }, []);

  const sortedAndFilteredPlayers = football_players
    .filter((player) => {
      const nameMatch = player.nameSurname.toLowerCase().includes(filter.toLowerCase());
      return nameMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'yearOfBirth') {
        return b.yearOfBirth - a.yearOfBirth;
      } else {
        return b[sortBy] - a[sortBy];
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
      <h1 className="table-title">Football Players</h1>
      <br />

      <div className="content-container">
        <div className="buttons-container">
          <Link to="/football/teams">
            <button className="show">Teams</button>
          </Link>
          <Link to="/football/statistic">
            <button className="show">Statistics</button>
          </Link>
        </div>
        <br />

        <div className="filter-sort-container">
          <div className="sort-select">
            <label htmlFor="sort-by">Sort by:</label>
            <select id="sort-by" onChange={(e) => setSortBy(e.target.value)}>
              <option value="">--Select--</option>
              <option value="scored">Scored</option>
              <option value="played">Played</option>
              <option value="yearOfBirth">Year of Birth</option>
            </select>
          </div>

          <div className="filter-container">
            <label htmlFor="filter-by-nameSurname">Filter:</label>
            <input
              type="text"
              id="filter-by-nameSurname"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <table className="players-table">
          <thead>
            <tr>
              <th className="table-header">Number</th>
              <th className="table-header">Name Surname</th>
              <th className="table-header">Position</th>
              <th className="table-header">Year of Birth</th>
              <th className="table-header">Played</th>
              <th className="table-header">Scored</th>
            </tr>
          </thead>
          <tbody>
            {playersToShow.map((player, index) => (
              <tr className="player-row" key={`${player.id}_${index}`}>
                <td>{player.number}</td>
                <td>{player.nameSurname}</td>
                <td>{player.position}</td>
                <td>{player.yearOfBirth}</td>
                <td>{player.played}</td>
                <td>{player.scored}</td>
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

export default FootballPlayers;
