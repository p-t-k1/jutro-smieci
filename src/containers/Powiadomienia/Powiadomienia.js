import React  from 'react';
import './Powiadomienia.css'

function Powiadomienia() {

  return (
    <div className="Powiadomienia">
        <div className="Header-container">
            <span className="Header1">Ustaw powiadomienia przypominające</span><br />
            <span className="Header2">Podaj adres email oraz liczbę dni powiadomienia przed wywozem śmieci</span>
        </div>

        <div className="Form">
            <span>Adres email</span>
            <input type="text"/>

            <span>Przypomnienie:</span>
            <select name="days" id="days">
                <option value="1day">1 dzień przed wywozem</option>
                <option value="2day">2 dni przed wywozem</option>
                <option value="3day">3 dni przed wywozem</option>
                <option value="5day">5 dni przed wywozem</option>
            </select>

            <button>Zapisz</button>
        </div>
    </div>
  );
}

export default Powiadomienia;
