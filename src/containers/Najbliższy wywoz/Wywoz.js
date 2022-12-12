import React, {useEffect, useState} from 'react';
import './Wywoz.css'
import ListItem from "../../shared/ListItem/ListItem";
import axios from "axios";
import config from "../../config";
import moment from "moment"
import { toast } from 'react-toastify';

// eslint-disable-next-line no-unused-vars,react/prop-types
function Wywoz({props}) {

    const [data, setData] = useState();
    const areaId = JSON.parse(localStorage.getItem('area'))._id;

    const filterData = (data) => {
        let filteredData = data.filter(element =>
            moment(`${element.rok}-${element.miesiac}-${element.dzien}`) >= moment()
        );

        filteredData = filteredData.sort( compare );

        return filteredData;
    }
    const compare = ( a, b ) => {
        if ( moment(`${a.rok}-${a.miesiac}-${a.dzien}`) < moment(`${b.rok}-${b.miesiac}-${b.dzien}`) ){
            return -1;
        }
        if ( moment(`${a.rok}-${a.miesiac}-${a.dzien}`) > moment(`${b.rok}-${b.miesiac}-${b.dzien}`) ){
            return 1;
        }
        return 0;
    } // funkcja sortująca daty po kolei

    useEffect(() => {
        axios({
            method: 'post',
            url: `${config.serverUrl}/api/schedules/getById`,
            data: {
                id: areaId
            }
        })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    toast.error('Problem z połączeniem internetowym');
                } else if (error.response.data == "Not Found") {
                    toast.error("Twoja lokalizacja nie posiada jeszcze harmonogramu wywozu śmieci")
                } else {
                    toast.error(error.response.data);
                }
            });
    }, []);


    return (
        <div className="Wywoz">
            <div className="Header-container">
                <span className="Header1">Najbliższy wywóz dla</span><br/>
                {data && <span className="Header2">{data.schedule.obszar.kodpocztowy + " " + data.schedule.obszar.miejscowosc + ", " + data.schedule.obszar.ulica + " " + data.schedule.obszar.komentarz}</span> }
            </div>

            <div className="List">
                {data && filterData(data.schedule.wywozy).map(element => {
                    return (
                        <ListItem key={element._id} dzien={element.dzien} miesiac={element.miesiac} rok={element.rok} typ={element.typ}/>
                    )
                })}
            </div>

        </div>
    );
}

export default Wywoz;
