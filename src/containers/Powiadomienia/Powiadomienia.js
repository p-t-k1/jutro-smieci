import React, {useState} from 'react';
import './Powiadomienia.css'
import axios from "axios";
import config from "../../config";
import {toast} from "react-toastify";
import validateEmail from "../../utils/validateEmail";

function Powiadomienia() {

    const [email, setEmail] = useState();
    const [days, setDays] = useState("1day");
    const areaId = JSON.parse(localStorage.getItem('area'))._id;

    const setNotification = () => {
        if(!validateEmail(email) || email == undefined){
            return toast.error("Uzupełnij poprawnie wszystkie pola")
        }

        axios({
            method: 'post',
            url: `${config.serverUrl}/api/setNotification`,
            data: {
                email: email,
                days: days,
                areaId: areaId

            }
        })
            .then((response) => {
                toast.success(response.data)
                setEmail('')
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    toast.error('Problem z połączeniem internetowym');
                } else {
                    toast.error(JSON.stringify(error.response.data));
                }
            });
    }

    return (
    <div className="Powiadomienia">
        <div className="Header-container">
            <span className="Header1">Ustaw powiadomienia przypominające</span><br />
            <span className="Header2">Podaj adres email oraz liczbę dni powiadomienia przed wywozem śmieci</span>
        </div>

        <div className="Form">
            <span>Adres email</span>
            <input type="text" value={email} onChange={()=>setEmail(event.target.value)}/>

            <span>Kiedy przypominać</span>
            <select name="days" id="days" onChange={()=>setDays(event.target.value)}>
                <option value="1day">1 dzień przed wywozem</option>
                <option value="2day">2 dni przed wywozem</option>
                <option value="3day">3 dni przed wywozem</option>
                <option value="5day">5 dni przed wywozem</option>
            </select>

            <div className={"Add-Button"} onClick={setNotification}>Zapisz</div>
        </div>
    </div>
  );
}

export default Powiadomienia;
