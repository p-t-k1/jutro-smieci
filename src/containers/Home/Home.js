import '../App/App.css';
import React  from 'react';
import Item from "../../shared/Item/Item";
import './Home.css'

function Home() {

  return (
    <div className="Home">
        <Item title="Twoja lokalizacja" icon="location" desc="Dąbrowa Tarnowska, ul. Leśna 13a" nav="lokalizacja"/>
        <Item title="Najbliższy wywóz" icon="trash" desc="Zobacz najbliższy wywóz śmieci" nav="wywoz"/>
        <Item title="Harmonogram" icon="calendar" desc="Zobacz cały harmonogram" nav="harmonogram"/>
        <Item />
        <Item />
    </div>
  );
}

export default Home;
