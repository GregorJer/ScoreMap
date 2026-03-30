import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function VolleyballPlayers() {
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [volleyball_players, setVolleyballPlayers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Display 5 items per page
    const [maxPageButtonsToShow] = useState(5); // Limit the number of displayed page buttons
    const [visiblePageButtons, setVisiblePageButtons] = useState([]);

    useEffect(() => {
        const getProfile = async function () {
            const res = await fetch('http://localhost:3000/volleyball/players', {
                credentials: 'include'
            });
            const data = await res.json();
            setVolleyballPlayers(data);
        };
        getProfile();
    }, []);

    const toDayMonthYear = (date) => {
        let d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    const sortedAndFilteredPlayers = volleyball_players
        .filter((player) => {
            const nameMatch = player.name.toLowerCase().includes(filter.toLowerCase());
            return nameMatch;
        })
        .sort((a, b) => {
            if (sortBy === 'date_of_birth') {
                return new Date(b.date_of_birth) - new Date(a.date_of_birth);
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
            <h1 className="table-title">Volleyball Players</h1>
            <br />

            <div className="content-container">
                <div className="buttons-container">
                    <Link to="/volleyball/teams">
                        <button className="show">Teams</button>
                    </Link>
                    <Link to="/volleyball/statistic">
                        <button className="show">Statistics</button>
                    </Link>
                </div>
                <br />

                <div className="filter-sort-container">
                    <div className="sort-select">
                        <label htmlFor="sort-by">Sort by:</label>
                        <select id="sort-by" onChange={(e) => setSortBy(e.target.value)}>
                            <option value="">--Select--</option>
                            <option value="spike_reach">Spike Reach</option>
                            <option value="block_reach">Block Reach</option>
                            <option value="height">Height</option>
                            <option value="date_of_birth">Date of Birth</option>
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
                            <th className="table-header">Number</th>
                            <th className="table-header">Name</th>
                            <th className="table-header">Position</th>
                            <th className="table-header">Date of Birth</th>
                            <th className="table-header">Height</th>
                            <th className="table-header">Spike Reach</th>
                            <th className="table-header">Block Reach</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playersToShow.map((player, index) => (
                            <tr className="player-row" key={`${player.id}_${index}`}>
                                <td>{player.number}</td>
                                <td>{player.name}</td>
                                <td>{player.position}</td>
                                <td data-date-of-birth>{toDayMonthYear(player.date_of_birth)}</td>
                                <td data-height>{player.height}</td>
                                <td data-spike-reach>{player.spike_reach}</td>
                                <td data-block-reach>{player.block_reach}</td>
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

export default VolleyballPlayers;
