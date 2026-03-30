import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from "./userContext";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import MapView from './components/MapView';


import VolleyballStatistic from './components/Volleyball/VolleyballStatistic';
import VolleyballTeams from './components/Volleyball/VolleyballTeams';
import VolleyballPlayers from './components/Volleyball/VolleyballPlayers';

import HandballStatistic from './components/Handball/HandballStatistic';
import HandballTeams from './components/Handball/HandballTeams';
import HandballPlayers from './components/Handball/HandballPlayers';

import FootballPlayers from './components/Foorball/FootballPlayers';
import FootballStatistic from './components/Foorball/FootballStatistic';
import FootballTeams from './components/Foorball/FootballTeams';

import Admin from './components/Admin';
import AnimationMap from './components/AnimationMap';

import Chat from './components/Chat';
//import OldMessages from './components/OldMessages';



import './App.css';
import './form_styles.css';
import 'leaflet/dist/leaflet.css';



function App() {
  /**
   * Podatek o tem, ali je uporabnik prijavljen ali ne, bomo potrebovali v vseh komponentah.
   * State je dosegljiv samo znotraj trenutne komponente. Če želimo deliti spremenljivke z
   * ostalimi komponentami, moramo uporabiti Context.
   * Vsebino Contexta smo definirali v datoteki userContext.js. Poleg objekta 'user', potrebujemo
   * še funkcijo, ki bo omogočala posodabljanje te vrednosti. To funkcijo definiramo v komponenti App
   * (updateUserData). V render metodi pripravimo UserContext.Provider, naš Context je potem dosegljiv
   * v vseh komponentah, ki se nahajajo znotraj tega providerja.
   * V komponenti Login ob uspešni prijavi nastavimo userContext na objekt s trenutno prijavljenim uporabnikom.
   * Ostale komponente (npr. Header) lahko uporabijo UserContext.Consumer, da dostopajo do prijavljenega
   * uporabnika.
   * Context se osveži, vsakič ko osvežimo aplikacijo v brskalniku. Da preprečimo neželeno odjavo uporabnika,
   * lahko context trajno hranimo v localStorage v brskalniku.
   */
  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  /**
   * Na vrhu vključimo komponento Header, z naslovom in menijem.
   * Nato vključimo Router, ki prikaže ustrezno komponento v odvisnosti od URL naslova.
   * Pomembno je, da za navigacijo in preusmeritve uporabljamo komponenti Link in Navigate, ki sta
   * definirani v react-router-dom modulu. Na ta način izvedemo navigacijo brez osveževanja
   * strani. Klasične metode (<a href=""> in window.location) bi pomenile osvežitev aplikacije
   * in s tem dodatno obremenitev (ponovni izris komponente Header, ponastavitev Contextov,...)
   */
  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user: user,
        setUserContext: updateUserData
      }}>
        <div className="App">
          <Header title="ScoreMap"></Header>
          <Routes> 
            <Route path="/" exact element={<MapView />}></Route>      
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/admin" exact element={<Admin />}></Route>  

            <Route path="/chat/:gameType/:gameId" element={<Chat />} />

            <Route path="/volleyball/players" exact element={<VolleyballPlayers />}></Route>
            <Route path="/volleyball/teams" exact element={<VolleyballTeams />}></Route>
            <Route path="/volleyball/statistic" exact element={<VolleyballStatistic />}></Route>
            <Route path="/map" exact element={<AnimationMap />}></Route>

            <Route path="/handball/statistic" exact element={<HandballStatistic />}></Route>  
            <Route path="/handball/teams" exact element={<HandballTeams />}></Route>     
            <Route path="/handball/players" exact element={<HandballPlayers />}></Route> 

            <Route path="/football/players" exact element={<FootballPlayers />}></Route> 
            <Route path="/football/statistic" exact element={<FootballStatistic />}></Route>   
            <Route path="/football/teams" exact element={<FootballTeams />}></Route>        

          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
