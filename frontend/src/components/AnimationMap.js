import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

const VolleyballGamesMap = () => {
  const [games, setGames] = useState([]);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [currentGame, setCurrentGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const [volleyballGamesRes, footballGamesRes, handballGamesRes] = await Promise.all([
          axios.get('http://localhost:3000/volleyball/games'),
          axios.get('http://localhost:3000/football/games'),
          axios.get('http://localhost:3000/handball/games')
        ]);

        const volleyballGamesData = volleyballGamesRes.data.map((game) => ({
          ...game,
          gameType: 'volleyball',
        }));

        const footballGamesData = footballGamesRes.data.map((game) => ({
          ...game,
          gameType: 'football',
          dateTime: new Date(game.date).toISOString(),
        }));

        const handballGamesData = handballGamesRes.data.map((game) => ({
          ...game,
          gameType: 'handball',
          firstOpponent: game.homeTeam,
          secondOpponent: game.awayTeam,
        }));

        const allGames = [...volleyballGamesData, ...footballGamesData, ...handballGamesData].filter(
          (game) => game.lat && game.lng
        );

        setGames(allGames);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    const sortedGames = [...games].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

    const intervalId = setInterval(() => {
      if (sortedGames.length > 0) {
        const game = sortedGames.shift();
        setDisplayedGames((currentGames) => [...currentGames, game]);
        setCurrentDate(new Date(game.dateTime).toLocaleDateString());
        setCurrentGame(game);
        setGames(sortedGames);
      }
    }, 200);

    return () => clearInterval(intervalId);
  }, [games]);

  const getIcon = (gameType) => {
    if (gameType === 'volleyball') {
      return new L.DivIcon({
        className: 'my-custom-pin',
        html: `<span role="img" aria-label="volleyball" style="font-size: 1.7em;">🏐</span>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
    } else if (gameType === 'football') {
      return new L.DivIcon({
        className: 'my-custom-pin',
        html: `<span role="img" aria-label="football" style="font-size: 1.7em;">⚽</span>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
    } else if (gameType === 'handball') {
      return new L.DivIcon({
        className: 'my-custom-pin',
        html: `<span role="img" aria-label="handball" style="font-size: 1.7em;">🤾</span>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
    }
  };

  return (
    <div className="map-container">
      <div className='map-animation-information'>
      <h1 className="date-display">Current Date: {currentDate}</h1>
      <div className='map-animation-information-other'>
        {currentGame && (
          <div>
            <div>Game Type: {currentGame.gameType}</div>
            <div>First Opponent: {currentGame.firstOpponent}</div>
            <div>Second Opponent: {currentGame.secondOpponent}</div>
          </div>
        )}
      </div>
      </div>
      <MapContainer center={[46.1512, 14.9955]} zoom={8} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {displayedGames.map((game, index) => (
          <Marker
            key={`${game._id}-${game.gameType}-${index}`}
            position={[game.lat, game.lng]}
            icon={getIcon(game.gameType)}
          >
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default VolleyballGamesMap;
