import React  from 'react';
import './ListItem.css'
import PropTypes from "prop-types";
import moment from "moment";
import 'moment/locale/pl'

function ListItem({dzien, miesiac, rok, typ}) {

    const color = (typ) => {
        if( typ === 'plastik' ) return {borderLeft: '8px solid #f1f57a'};
        if( typ === 'szklo' ) return {borderLeft: '8px solid #95bf8f'};
        if( typ === 'papier' ) return {borderLeft: '8px solid #93cbf0'};
        if( typ === 'zmieszane' ) return {borderLeft: '8px solid #e0e0e0'};
        if( typ === 'bio' ) return {borderLeft: '8px solid #b3a79e'};
        if( typ === 'gabaryt' ) return {borderLeft: '8px solid #e3c6c6'};
    }

    const name = (typ) => {
        if (typ === 'plastik') return "Tworzywa sztuczne";
        if (typ === 'szklo') return "Szkło";
        if (typ === 'papier') return "Papier";
        if (typ === 'zmieszane') return "Zmieszane";
        if (typ === 'bio') return "Biodegradowalne";
        if (typ === 'gabaryt') return "Wielkogabarytowe";
    }

    const month = (miesiac) => {
        if (miesiac == "1") return "STY";
        if (miesiac == "2") return "LUT";
        if (miesiac == "3") return "MAR";
        if (miesiac == "4") return "KWI";
        if (miesiac == "5") return "MAJ";
        if (miesiac == "6") return "CZE";
        if (miesiac == "7") return "LIP";
        if (miesiac == "8") return "SIE";
        if (miesiac == "9") return "WRZ";
        if (miesiac == "10") return "PAZ";
        if (miesiac == "11") return "LIS";
        if (miesiac == "12") return "GRU";
    }
    const dayName = moment(`${rok}-${miesiac}-${dzien}`).locale('pl').format('dddd');
    const daysDifference = () => {
        const numberOfDays = moment(`${rok}-${miesiac}-${dzien}`).diff(moment(), 'days')+1;
        if(numberOfDays == 0) return "Dzisiaj";
        if(numberOfDays == 1) return "Jutro";
        if(numberOfDays > 14) return "Za Ponad 2 Tygodnie";
        if(numberOfDays > 7) return "Za Ponad Tydzień";
        return "Za " + numberOfDays + " Dni";
    }

    return (
    <div className="ListItem" style={color(typ)}>
        <div className="Date">
            <span>{dzien}<br />{month(miesiac)}</span>
        </div>
        <div className="TrashDesc">
            <div>{name(typ)}</div>
            <div className="TrashDescDate">{dayName} - {daysDifference()}</div>
        </div>
    </div>
  );
}

ListItem.propTypes = {
    dzien: PropTypes.string,
    miesiac: PropTypes.string,
    rok: PropTypes.string,
    typ: PropTypes.string,
};

export default ListItem;
