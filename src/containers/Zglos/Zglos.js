import React, {useState} from 'react';
import './Zglos.css'
import axios from "axios";
import config from "../../config";
import {toast} from "react-toastify";

function Zglos() {

    const [email, setEmail] = useState("");
    const [title, setTile] = useState("");
    const [message, setMessage] = useState("");
    const token = JSON.parse(localStorage.getItem('area'));

    const handleAddNew = () => {
        axios({
            method: 'post',
            url: `${config.serverUrl}/api/messages/addNew`,
            data: {
                email: email,
                title: title,
                message: message,
                area: token,
            }
        })
            .then(() => {
                toast.success("Wysłano zgłoszenie")
                clearInputs()
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    alert('Problem z połączeniem internetowym');
                } else {
                    alert(JSON.stringify(error.response.data));
                }
            });
    }
    const clearInputs = () => {
        setEmail("")
        setMessage("")
        setTile("")
    }

    return (
    <div className="Zglos">
        <div className="Header-container">
            <span className="Header1">Wyślij zgłoszenie o problemie</span><br />
            <span className="Header2">Opisz swój problem i prześlij go do firmy zajmującej się wywozem śmieci</span>
        </div>

        <div className="Form">
            <span>Email kontaktowy:</span>
            <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)}/>

            <span>Temat:</span>
            <input type="text" value={title} onChange={(event) => setTile(event.target.value)}/>

            <span>Treść zgłoszenia:</span>
            <textarea value={message} onChange={(event) => setMessage(event.target.value)}></textarea>

            <div className={"Add-Button"} onClick={handleAddNew}>Zapisz</div>
        </div>
    </div>
  );
}

export default Zglos;
