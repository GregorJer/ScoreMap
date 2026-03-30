import React, { useState, useEffect } from "react";
import '../styles/style.css';
import { Link } from "react-router-dom";

function FootballTeams() {
    const [footballTeams, setFootballTeams] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(function () {
        const getTeams = async function () {
            const res = await fetch("http://localhost:3000/football/teams", { credentials: "include" });
            const data = await res.json();
            setFootballTeams(data);
        }
        getTeams();
    }, []);

    const filteredTeams = footballTeams
        ? footballTeams.filter((team) =>
            team.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        : [];

    const paginatedTeams = filteredTeams.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPage = Math.ceil(filteredTeams.length / itemsPerPage);

    function changePage(newPage) {
        setCurrentPage(newPage);
    }

    return (
        <div>
            <h1 className="team-header">Football Teams</h1>

            <div className="team_filter-container">
                <Link to="/football/players">
                    <button className="show">Players</button>
                </Link>
                <Link to="/football/statistic">
                    <button className="show">Statistics</button>
                </Link>
                <label htmlFor="team-filter">Team:</label>
                <input
                    type="text"
                    id="team-filter"
                    onChange={(e) => setFilterValue(e.target.value)}
                />
            </div>

            <div className="team-list">
                {paginatedTeams.map((team) => (
                    <div className="team-item" key={team._id}>
                        <h2 className="team-name">{team.name}</h2>
                        <h5 className="team-members-title">Football Players:</h5>
                        <div className="team-members-list">
                            {team.footballPlayers.map((player, index) => (
                                <span className="team-member" key={index}>
                                    {player}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="teams-pagination">
                {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        className={`page-button ${pageNumber === currentPage ? "active" : ""}`}
                        key={pageNumber}
                        onClick={() => changePage(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FootballTeams;
