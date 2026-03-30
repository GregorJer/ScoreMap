import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import './styles/map.css';
import axios from 'axios';

const volleyballIcon = new L.DivIcon({
  className: "my-custom-pin",
  html: `<span role="img" aria-label="volleyball" style="font-size: 1.7em;">🏐</span>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const footballIcon = new L.DivIcon({
  className: "my-custom-pin",
  html: `<span role="img" aria-label="football" style="font-size: 1.7em;">⚽</span>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const mixedGamesIcon = new L.DivIcon({
  className: "my-custom-pin",
  html: `<span role="img" aria-label="both" style="font-size: 1.7em;">🎽</span>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});
const handballIcon = new L.DivIcon({
  className: "my-custom-pin",
  html: `<span role="img" aria-label="handball" style="font-size: 1.7em;">🤾‍♂️</span>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});


const defaultCenter = {
  lat: 46.1512,
  lng: 14.9955,
};

const MapView = () => {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({ location: "", dateTime: "", firstOpponent: "", secondOpponent: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const handlePopupClick = async (game_id, gameType) => {
    try {
      // Redirect to the chat page for this game
      navigate(`/chat/${gameType}_game/${game_id}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const fetchGames = async () => {
      // Fetch volleyball games
      const volleyballGamesRes = await fetch("http://localhost:3000/volleyball/games", { credentials: "include" });
      const volleyballGamesData = await volleyballGamesRes.json();
      volleyballGamesData.forEach(game => game.gameType = 'volleyball');

       // Fetch football games
       const footballGamesRes = await fetch("http://localhost:3000/football/games", { credentials: "include" });
       const footballGamesData = await footballGamesRes.json();
       footballGamesData.forEach(game => {
         game.gameType = 'football';
         // Convert date field to dateTime format
         game.dateTime = new Date(game.date).toISOString();
       });

      // Fetch handball games
      const handballGamesRes = await fetch("http://localhost:3000/handball/games", { credentials: "include" });
      const handballGamesData = await handballGamesRes.json();
      handballGamesData.forEach(game => {
        game.gameType = 'handball';
        game.firstOpponent = game.homeTeam;
        game.secondOpponent = game.awayTeam;
      });

      // Merge the two arrays and filter out games without location data
      //const allGames = [...volleyballGamesData, ...footballGamesData].filter(game => game.lat && game.lng);
      const allGames = [...volleyballGamesData, ...footballGamesData, ...handballGamesData].filter(game => game.lat && game.lng);

      // Filter the games according to the filters and group by location
      // Filter the games according to the filters and group by location
      const groupedGames = allGames
        .filter(game => {
          const dateMatches = !filters.dateTime || new Date(game.dateTime).toDateString() === new Date(filters.dateTime).toDateString();
          const locationMatches = !filters.location || game.location.toLowerCase().includes(filters.location.toLowerCase());
          const firstOpponentMatches = !filters.firstOpponent || game.firstOpponent.toLowerCase().includes(filters.firstOpponent.toLowerCase());
          const secondOpponentMatches = !filters.secondOpponent || game.secondOpponent.toLowerCase().includes(filters.secondOpponent.toLowerCase());

          return dateMatches && locationMatches && firstOpponentMatches && secondOpponentMatches;
        })
        .reduce((grouped, game) => {
          const key = `${game.lat}-${game.lng}`;

          if (!grouped[key]) {
            grouped[key] = {
              volleyball: [],
              football: [],
              handball: []
            };
          }

          grouped[key][game.gameType].push(game);
          return grouped;
        }, {});


      setGames(groupedGames);
    };

    fetchGames();

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [filters]);

  const handleInputChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const clearFilters = () => {
    setFilters({ location: "", dateTime: "", firstOpponent: "", secondOpponent: "" });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="map-container">
      <div className="filter-toggle" style={{ display: isFilterOpen ? 'none' : 'block', transition: 'display 0.3s ease-in-out' }} onClick={toggleFilter}>
        <span className="fa fa-sliders icon"></span>
      </div>

      <div className={`map-filter-container ${isFilterOpen ? 'open' : ''}`}>
        <div className="filter-content">
          <span className="fa fa-sliders filter-toggle-invert icon" onClick={toggleFilter}></span>
          <input className='map-text-filter' type="text" name="location" placeholder="Location" value={filters.location} onChange={handleInputChange} />
          <input className='map-text-filter' type="text" name="firstOpponent" placeholder="Home team" value={filters.firstOpponent} onChange={handleInputChange} />
          <input className='map-text-filter' type="text" name="secondOpponent" placeholder="Away team" value={filters.secondOpponent} onChange={handleInputChange} />
          <input className='map-text-filter' type="date" name="dateTime" value={filters.dateTime} onChange={handleInputChange} />
          <button className='map-clear-filter form-submit' onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>

      <MapContainer className="map" center={defaultCenter} zoom={8}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          detectRetina={true}
        />
        {Object.values(games).map(gameGroup => {
          const { volleyball, football, handball } = gameGroup;
          const allGames = [...volleyball, ...football, ...handball];
          if (allGames.length === 0 || !allGames[0].lat || !allGames[0].lng) {
            // Skip if there are no games, or the first game does not have location data
            return null;
          }
          const gameTypes = [volleyball, football, handball].filter(gameType => gameType.length > 0).length;

          let chosenIcon;
          if (gameTypes > 1) {
            chosenIcon = mixedGamesIcon;
          } else if (volleyball.length) {
            chosenIcon = volleyballIcon;
          } else if (football.length) {
            chosenIcon = footballIcon;
          } else {
            chosenIcon = handballIcon;
          }

          return (
            <Marker key={`${allGames[0].lat}-${allGames[0].lng}`} position={{ lat: allGames[0].lat, lng: allGames[0].lng }} icon={chosenIcon}>
              <Popup>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {allGames.map((game, i) => (
                    <div className='game-container' onClick={() => handlePopupClick(game._id, game.gameType)} key={game._id}>                
                      <h5>{game.firstOpponent} vs {game.secondOpponent}</h5>
                      {game.gameType === "handball" && <div className='pop-up-element'>Score: {game.homeGoals} - {game.awayGoals}</div>}
                      <div className='pop-up-element'>Location: {game.location}</div>
                      <div className='pop-up-element'>Date and Time: {new Date(game.dateTime).toLocaleString()}</div>
                      <div className="map-game-type">{game.gameType}</div>
                      {i < allGames.length - 1 && <hr></hr>}
                    </div>
                  ))}
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
