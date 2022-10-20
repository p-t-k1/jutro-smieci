import '../App/App.css';
import React  from 'react';
import './Wywoz.css'
import ListItem from "../../shared/ListItem/ListItem";

function Wywoz() {

    const harmonogram = {
        lokalizacja: "Dąbrowa Tarnowska ul. Leśna 123a",
        wywozy: [
            {day: '12', month: 'listopad', 'rok': 2022, nazwa: 'Tworzywa sztuczne', typ: 'plastik'},
            {day: '13', month: 'listopad', 'rok': 2022, nazwa: 'Szkło', typ: 'szklo'},
            {day: '02', month: 'grudzień', 'rok': 2022, nazwa: 'Papier', typ: 'papier'},
        ]

    }

  return (
    <div className="Wywoz">
        <div className="Header-container">
            <span className="Header1">Najbliższy wywóz dla</span><br />
            <span className="Header2">{harmonogram.lokalizacja}</span>
        </div>

        <div className="List">
            {harmonogram.wywozy.map(element => {
                return (
                    <ListItem key='s' day={element.day} month={element.month} nazwa={element.nazwa} typ={element.typ} />
                )
            })}
        </div>
    </div>
  );
}

export default Wywoz;
