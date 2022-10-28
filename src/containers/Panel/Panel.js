import React  from 'react';
import Item from "../../shared/Item/Item";
import './Panel.css'

function Panel() {

  return (
      <>
        <div className="Panel-header">Panel administracyjny dla firmy: MPGK Tarnów</div>
        <div className="Panel">
            <Item title="Dostępne lokalizacje" icon="location" desc="Przejrzyj lub dodaj nową lokalizację" nav="lokalizacja"/>
            <Item title="Twoje harmonogramy" icon="calendar" desc="Przeglądaj harmonogramy wywozu lub dodaj nowy" nav="harmonogram"/>
            <Item title="Przesłane zgłoszenia" icon="mail" desc="Przeglądaj zgłoszenia i problemy klientów" nav="harmonogram"/>
            <Item />
        </div>
      </>
  );
}

export default Panel;
