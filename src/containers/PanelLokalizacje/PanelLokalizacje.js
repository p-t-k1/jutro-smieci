import React, {useEffect, useState} from 'react';
import './PanelLokalizacje.css'
import AddressItem from "../../shared/AddressItem/AddressItem";
import axios from "axios";
import config from "../../config";
import {TrashOutline} from "react-ionicons";
import {toast} from "react-toastify";

function PanelLokalizacje() {

    const token = JSON.parse(localStorage.getItem('smieci-token'));
    const [data, setData] = useState();
    const [search, setSearch] = useState("");
    const [ulica, setUlica] = useState("");
    const [identyfikator, setIdentyfikator] = useState("");
    const [komentarz, setKomentarz] = useState("");
    const [miejscowosc, setMiejscowosc] = useState("");
    const [kodpocztowy, setKodpocztowy] = useState("");

    const filterList = (data) => {
        let filteredList = data.filter(element =>
            element.miejscowosc.toLowerCase().startsWith(search.toLowerCase()) ||
            element.ulica.toLowerCase().startsWith(search.toLowerCase()) ||
            element.kodpocztowy.toLowerCase().startsWith(search.toLowerCase())
        )

        return filteredList;
    }
    const setArea = (data) => {
        setIdentyfikator(data._id);
        setUlica(data.ulica);
        setKomentarz(data.komentarz);
        setMiejscowosc(data.miejscowosc);
        setKodpocztowy(data.kodpocztowy)
    }
    const clearInputs = () => {
        setKodpocztowy("")
        setMiejscowosc("")
        setUlica("")
        setKomentarz("")
        setIdentyfikator("")
    }
    const handleAddNew = () => {
        axios({
            method: 'post',
            url: `${config.serverUrl}/api/areas/addNew`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                miejscowosc: miejscowosc,
                ulica: ulica,
                komentarz: komentarz,
                kodpocztowy: kodpocztowy,
            }
        })
            .then(() => {
                getAreas();
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    toast.error('Problem z połączeniem internetowym');
                } else {
                    toast.error(JSON.stringify(error.response.data));
                }
            });
    }
    const handleDelete = () => {
        axios({
            method: 'delete',
            url: `${config.serverUrl}/api/areas/delete`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                areaId: identyfikator
            }
        })
            .then(() => {
                getAreas();
                clearInputs();
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    toast.error('Problem z połączeniem internetowym');
                } else {
                    toast.error(JSON.stringify(error.response.data));
                }
            });
    }
    const handleEdit = () => {
        axios({
            method: 'put',
            url: `${config.serverUrl}/api/areas/edit`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                miejscowosc: miejscowosc,
                ulica: ulica,
                komentarz: komentarz,
                kodpocztowy: kodpocztowy,
                id: identyfikator
            }
        })
            .then(() => {
                getAreas();
                clearInputs();
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    toast.error('Problem z połączeniem internetowym');
                } else {
                    toast.error(JSON.stringify(error.response.data));
                }
            });
    }

    const getAreas = () => {
        axios({
            method: 'get',
            url: `${config.serverUrl}/api/areas/getCompanyAreas`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    toast.error('Problem z połączeniem internetowym');
                } else {
                    toast.error(error.response.data);
                }
            });
    }

    useEffect(() => {
        getAreas()
    }, []);

  return (
    <div className="PanelLokalizacje">
        <div className="Header-container">
            <span className="Header1">Twoje dodane lokalizacje</span><br />
            <span className="Header2">Dodaj nową lub edytuj wybraną lokalizację</span>
        </div>

        <div className="Content">
            <div className="Left-Content-loc">
                <div className="Form">
                    <span>Wyszukaj</span>
                    <input type="text" value={search} onChange={() => setSearch(event.target.value)}/>

                </div>
                <div className="Results">
                    <span>Znalezione adresy:</span>
                    {
                        data && filterList(data).map(element => {
                            return(
                                <AddressItem key={element._id} data={element} action={setArea}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className="Right-Content-loc">
                <span className="Edit-Title">Edycja obszaru {identyfikator && <TrashOutline onClick={handleDelete} className="Edit-Delete" color={'#d54830'} height="30px" width="30px"/>}</span>
                <span className="Edit-Id">{identyfikator ? `Identyfikator obszaru: ${identyfikator}` : ""}</span>
                <div className="Form">
                    <span>Ulica</span>
                    <input type="text" value={ulica} onChange={() => setUlica(event.target.value)}/>
                    <span>Komentarz</span>
                    <input type="text" value={komentarz} onChange={() => setKomentarz(event.target.value)}/>
                    <span>Miejscowość</span>
                    <input type="text" value={miejscowosc} onChange={() => setMiejscowosc(event.target.value)}/>
                    <span>Kod pocztowy</span>
                    <input type="text" value={kodpocztowy} onChange={() => setKodpocztowy(event.target.value)}/>
                    {!identyfikator && <div className="Add-Button" onClick={handleAddNew}>Dodaj nowy obszar</div>}
                    {identyfikator && <div className="Add-Button" onClick={handleEdit}>Edytuj dane</div>}
                    <div className="Clear-Button" onClick={clearInputs}>Wyczyść</div>
                </div>
            </div>
        </div>



    </div>
  );
}

export default PanelLokalizacje;
