import '../App/App.css';
import React, {useEffect} from 'react';
import './Harmonogram.css'

function Harmonogram() {

    const harmonogram = {
        lokalizacja: {
            miasto: "Tarnów",
            ulica: "1 Maja",
            kodpocztowy: "33-100",
            dodatkowe: "",
        },
        wywozy: [
            {day: '12', month: '01', year: '2022', nazwa: 'Zmieszane', typ: 'mixed'},
            {day: '24', month: '01', year: '2022', nazwa: 'Zmieszane', typ: 'mixed'},
            {day: '4', month: '01', year: '2022', nazwa: 'Szkło', typ: 'glass'},
            {day: '14', month: '01', year: '2022', nazwa: 'Plastik', typ: 'plastic'},
            {day: '13', month: '01', year: '2022', nazwa: 'Papier', typ: 'paper'},
            {day: '24', month: '01', year: '2022', nazwa: 'Bio odpady', typ: 'bio'},
            {day: '1', month: '01', year: '2022', nazwa: 'Wielkogabarytowe', typ: 'bulk'},
            {day: '3', month: '02', year: '2022', nazwa: 'Wielkogabarytowe', typ: 'bulk'},
        ]

    }

    useEffect(() => {
        console.log("MAPUJE!")
        test();
    },[]);

    const test = () =>{
        harmonogram.wywozy.map(element => {
            const singleCell = document.getElementsByClassName(`month ${element.month}`)[0].getElementsByClassName(`type-${element.typ}`)[0];
            if(singleCell.textContent == ""){
                singleCell.textContent += `${element.day}`
            } else {
                singleCell.textContent += `,${element.day}`
            }
        })
    }

  return (
    <div className="Harmonogram">
        <div className="Header-container">
            <span className="Header1">Harmonogram wywozu dla:</span><br />
            <span className="Header2">{harmonogram.lokalizacja.miasto + harmonogram.lokalizacja.ulica}</span>
        </div>

        <div className="Schedule">
            <div className="first-row"><div className="header-month-name">Miesiąc</div><div className="header-type-mixed">Zmieszane</div><div className="header-type-glass">Szkło</div><div className="header-type-plastic">Tworzywa sztuczne</div><div className="header-type-paper">Papier</div><div className="header-type-bio">Biodegradowalne</div><div className="header-type-bulk">Wielkogabarytowe</div></div>
            <div className="month 01"><div className="month-name">Styczeń</div><div className="type-mixed"></div><div className="type-glass"></div><div className="type-plastic"></div><div className="type-paper"></div><div className="type-bio"></div><div className="type-bulk"></div></div>
            <div className="month 02"><div className="month-name">Luty</div><div className="type-mixed"></div><div className="type-glass"></div><div className="type-plastic"></div><div className="type-paper"></div><div className="type-bio"></div><div className="type-bulk"></div></div>
        </div>
    </div>
  );
}

export default Harmonogram;
