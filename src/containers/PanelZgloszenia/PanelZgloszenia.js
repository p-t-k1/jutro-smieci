import React, {useEffect, useState} from 'react';
import './PanelZgloszenia.css'
import axios from "axios";
import config from "../../config";
import {TrashOutline} from "react-ionicons";
import moment from "moment";
import {toast} from "react-toastify";

function PanelZgloszenia() {

    const [data, setData] = useState();
    const [search, setSearch] = useState("");
    const [messageId, setMessageId] = useState();

    const token = JSON.parse(localStorage.getItem('smieci-token'));
    const renderMessage = (data) =>{
        console.log(data.otwarta)
        return(
            <div className="Message" onClick={() => choose(data._id)}>
                <div className="Message-first-row"><span>{data.email}</span><span>{moment(data.createdAt).format('lll')}</span></div>
                {data.otwarta && <div className="Message-second-row">{data.tytul}</div>}
                {!data.otwarta && <div className="Message-second-row-bold">{data.tytul}</div>}
            </div>
        )
    }
    const getMessages = () => {
        axios({
            method: 'get',
            url: `${config.serverUrl}/api/messages/getCompanyMessages`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setData(response.data.reverse());
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    alert('Problem z połączeniem internetowym');
                } else {
                    alert(error.response.data);
                }
            });
    }
    const choose = (id) => {
        setMessageId(id)
        handleOpenMessage(id)
    }
    const filterList = (data) => {
        let filteredList = data.filter(element =>
            element.tresc.toLowerCase().startsWith(search.toLowerCase()) ||
            element.tytul.toLowerCase().startsWith(search.toLowerCase()) ||
            element.email.toLowerCase().startsWith(search.toLowerCase())
        )
        return filteredList;
    }
    const handleDelete = () => {
        axios({
            method: 'delete',
            url: `${config.serverUrl}/api/messages/delete`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                messageId: messageId
            }
        })
            .then(() => {
                toast.success("Usunięto wiadomość")
                setData(data.filter(element => element._id != messageId))
                setMessageId(null)
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    alert('Problem z połączeniem internetowym');
                } else {
                    alert(JSON.stringify(error.response.data));
                }
            });
    }
    const handleOpenMessage = (id) => {
        axios({
            method: 'post',
            url: `${config.serverUrl}/api/messages/open`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                messageId: id
            }
        })
            .then(() => {
                getMessages()
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    alert('Problem z połączeniem internetowym');
                } else {
                    alert(JSON.stringify(error.response.data));
                }
            });
    }

    useEffect(() => {
        getMessages()
    }, []);

    return (
    <div className="PanelLokalizacje">
        <div className="Header-container">
            <span className="Header1">Przesłane zgłoszenia</span><br />
            <span className="Header2">Kliknij aby przeczytać szczegóły zgłoszenia</span>
        </div>

        <div className="Content">
            <div className="Left-Content">
                <div className="Searchbar"><input className="Searchbar-input" placeholder="Wpisz aby wyszukać" onChange={(event)=>setSearch(event.target.value)}/></div>
                {data && filterList(data).map((element, index) => renderMessage(element, index))}
            </div>
            <div className="Right-Content">
                <div className="Options">{messageId && <TrashOutline color={'#00000'} height="30px" width="30px" onClick={handleDelete}/>}</div>
                <div className="Message-content">
                    <h2>{messageId && data.find(element => element._id == messageId).tytul}</h2>
                    <div>{messageId && `Od ${data.find(element => element._id == messageId).email}, dnia ${moment(data.find(element => element._id == messageId).createdAt).format('lll')}`}</div>
                    <div>{messageId && `Obszar wywozu: ${data.find(element => element._id == messageId).obszar.ulica} ${data.find(element => element._id == messageId).obszar.komentarz}, ${data.find(element => element._id == messageId).obszar.miejscowosc} ${data.find(element => element._id == messageId).obszar.kodpocztowy}`}</div>
                    <br/>
                    <br/>
                    <div>{messageId && data.find(element => element._id == messageId).tresc}</div>
                </div>
            </div>
        </div>



    </div>
  );
}

export default PanelZgloszenia;
