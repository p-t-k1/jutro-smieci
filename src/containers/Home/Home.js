import React, {useEffect, useState} from 'react';
import Item from "../../shared/Item/Item";
import './Home.css'

// eslint-disable-next-line react/prop-types,no-unused-vars
function Home({props}) {

    const [disabled, setDisabled] = useState(true);
    const yourLocationName = () => {
        let retrievedItem = localStorage.getItem('area');
        if(retrievedItem == null){
            return "Kliknij i wybierz najpierw swoją lokalizację";
        }
        var object = JSON.parse(retrievedItem);
        return object.miejscowosc + ", " + object.ulica + " " + object.komentarz;
    }

    useEffect(() => {
        let retrievedItem = localStorage.getItem('area');
        if(retrievedItem != null){
            setDisabled(false);
        }
    },[])


    return (
    <div className="Home">
        <Item title="Twoja lokalizacja" icon="location" desc={yourLocationName()} nav="lokalizacja"/>
        <Item disabled={disabled} title="Najbliższy wywóz" icon="trash" desc="Zobacz najbliższy wywóz śmieci" nav="wywoz"/>
        <Item disabled={disabled} title="Harmonogram" icon="calendar" desc="Zobacz cały harmonogram" nav="harmonogram"/>
        <Item disabled={disabled} title="Powiadomienia" icon="alarm" desc="Ustaw przypomnienie o wystawieniu śmieci" nav="powiadomienia"/>
        <Item disabled={disabled} title="Zgłoś problem" icon="alert" desc="Wyślij zgłoszenie do firmy zajmującej się wywozem śmieci" nav="zglos"/>
    </div>
  );
}

export default Home;
