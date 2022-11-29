import React, {useEffect, useState} from 'react';
import './PanelHarmonogram.css'
import axios from "axios";
import config from "../../config";
import moment from "moment";
import {useHistory} from "react-router-dom";


function PanelHarmonogram() {

    const history = useHistory();
    const token = JSON.parse(localStorage.getItem('smieci-token'));
    const [data, setData] = useState();
    const [areas, setAreas] = useState();
    const [areaId, setAreaId] = useState();
    const [search, setSearch] = useState("");


    const JSONToSchedule = () =>{
        if(data){
            data.schedule.wywozy.map(element => {
                const singleCell = document.getElementsByClassName(`month ${element.miesiac}`)[0].getElementsByClassName(`typ-${element.typ}`)[0];
                if(singleCell.value == ""){
                    singleCell.value += `${element.dzien}`
                } else {
                    singleCell.value += `,${element.dzien}`
                }
            })
        }
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
                setAreas(response.data);
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    alert('Problem z połączeniem internetowym');
                }
                else {
                    alert(error.response.data);
                }
            });
    }
    const getScheduleById = (areaId) => {
        clearAllFields();

        if(areaId == "brak"){
            setAreaId(null);
            setData(null);
            return;
        }

        if(areaId == "new"){
            history.push("/panel/lokalizacje");
        }

        setAreaId(areaId);

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
                setData(null)
                if (error.message === 'Network Error') {
                    alert('Problem z połączeniem internetowym');
                } else if (error.response.data == "Not Found") {
                    alert('Ta lokalizacja nie posiada żadnego harmonogramu');
                } else {
                    alert(error.response.data);
                }
            });
    }
    const clearAllFields = () => {
        let fields = document.querySelectorAll(".typ-zmieszane, .typ-szklo, .typ-plastik, .typ-papier, .typ-bio, .typ-gabaryt")
        fields.forEach(element => element.value = "");
    }
    const exportScheduleToJSON = () => {
        let wywozy = [];
        let fields = document.querySelectorAll(".typ-zmieszane, .typ-szklo, .typ-plastik, .typ-papier, .typ-bio, .typ-gabaryt")
        fields.forEach(element => {
            if(element.value != ""){
                if(element.value.includes(',')){
                    // wiecej niz 1 dzien w komórce
                    let typ = element.className.substring(4)
                    let miesiac = parseInt(element.parentElement.className.substring(6))
                    let rok = moment().year()
                    let dni = element.value.split(",")

                    dni.forEach(dzien => wywozy.push({dzien: parseInt(dzien), miesiac: miesiac, rok:rok, typ:typ}))
                } else {
                    // pojedynczy
                    let typ = element.className.substring(4)
                    let dzien = parseInt(element.value)
                    let miesiac = parseInt(element.parentElement.className.substring(6))
                    let rok = moment().year()
                    wywozy.push({dzien: dzien, miesiac: miesiac, rok:rok, typ:typ})
                }
            }
        })
        console.log(wywozy)
        return wywozy
    }
    const validateInput = () => {
        console.log(event.target.value)
        let letters = /[A-Za-z]+$/
        let validatedInput = event.target.value.replace(letters, "").replace(" ", "").replace(".", "")
        event.target.value = validatedInput
    }
    const handleEdit = () => {
        axios({
            method: 'put',
            url: `${config.serverUrl}/api/schedules/edit`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                id: data.schedule._id,
                wywozy: exportScheduleToJSON()
            }
        })
            .then(() => {
                alert("Pomyślnie zapisano")
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    alert('Problem z połączeniem internetowym');
                } else {
                    alert(JSON.stringify(error.response.data));
                }
            });
    }
    const handleAddNew = () => {
        axios({
            method: 'post',
            url: `${config.serverUrl}/api/schedules/addNew`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                areaId: areaId,
                wywozy: exportScheduleToJSON()
            }
        })
            .then(() => {
                alert("Pomyślnie dodano")
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    alert('Problem z połączeniem internetowym');
                } else {
                    alert(JSON.stringify(error.response.data));
                }
            });
    }
    const filterList = (data) => {
        let filteredList = data.filter(element =>
            element.miejscowosc.toLowerCase().startsWith(search.toLowerCase()) ||
            element.ulica.toLowerCase().startsWith(search.toLowerCase()) ||
            element.kodpocztowy.toLowerCase().startsWith(search.toLowerCase())
        )

        return filteredList;
    }



    useEffect(() => {
        getAreas();
    }, []);
    useEffect(() => {
        JSONToSchedule()
    }, [data]);


    return (
    <div className="Harmonogram">
        <div className="Header-container">
            <span className="Header1">Harmonogram wywozu dla:</span><br /><br />
            <input className="search-bar" placeholder="Wpisz aby wyszukać" type="text" value={search} onChange={() => setSearch(event.target.value)}/><br />
            <select name="area" id="area" onChange={() =>getScheduleById(event.target.value)}>
                <option value="brak">Wybierz obszar</option>
                {areas && filterList(areas).map(element =>
                    <option key={element._id} value={element._id}>{element.ulica} {element.komentarz}, {element.kodpocztowy} {element.miejscowosc}</option>
                )}
            </select><br/>
        </div>

        <div className="Schedule">

            <div className="first-row"><div className="header-month-name">Miesiąc</div><div className="header-typ-zmieszane">Zmieszane</div><div className="header-typ-szklo">Szkło</div><div className="header-typ-plastik">Tworzywa sztuczne</div><div className="header-typ-papier">Papier</div><div className="header-typ-bio">Biodegradowalne</div><div className="header-typ-gabaryt">Wielkogabarytowe</div></div>
            <div className="month 1"><div className="month-name">Styczeń</div><input onChange={validateInput} className="typ-zmieszane"></input><input onChange={validateInput} className="typ-szklo"></input><input onChange={validateInput} className="typ-plastik"></input><input onChange={validateInput} className="typ-papier"></input><input onChange={validateInput} className="typ-bio"></input><input onChange={validateInput} className="typ-gabaryt"></input></div>
            <div className="month 2"><div className="month-name">Luty</div><input onChange={validateInput} className="typ-zmieszane"></input><input onChange={validateInput} className="typ-szklo"></input><input onChange={validateInput} className="typ-plastik"></input><input onChange={validateInput} className="typ-papier"></input><input onChange={validateInput} className="typ-bio"></input><input onChange={validateInput} className="typ-gabaryt"></input></div>
            <div className="month 3"><div className="month-name">Marzec</div><input onChange={validateInput} className="typ-zmieszane"></input><input onChange={validateInput} className="typ-szklo"></input><input onChange={validateInput} className="typ-plastik"></input><input onChange={validateInput} className="typ-papier"></input><input onChange={validateInput} className="typ-bio"></input><input onChange={validateInput} className="typ-gabaryt"></input></div>
            <div className="month 4"><div className="month-name">Kwiecień</div><input onChange={validateInput} className="typ-zmieszane"></input><input onChange={validateInput} className="typ-szklo"></input><input onChange={validateInput} className="typ-plastik"></input><input onChange={validateInput} className="typ-papier"></input><input onChange={validateInput} className="typ-bio"></input><input onChange={validateInput} className="typ-gabaryt"></input></div>
            <div className="month 5"><div className="month-name">Maj</div><input onChange={validateInput} className="typ-zmieszane"></input><input onChange={validateInput} className="typ-szklo"></input><input onChange={validateInput} className="typ-plastik"></input><input onChange={validateInput} className="typ-papier"></input><input onChange={validateInput} className="typ-bio"></input><input onChange={validateInput} className="typ-gabaryt"></input></div>
            <div className="month 6"><div className="month-name">Czerwiec</div><input onChange={validateInput} className="typ-zmieszane"></input><input onChange={validateInput} className="typ-szklo"></input><input onChange={validateInput} className="typ-plastik"></input><input onChange={validateInput} className="typ-papier"></input><input onChange={validateInput} className="typ-bio"></input><input onChange={validateInput} className="typ-gabaryt"></input></div>
            <div className="month 7"><div className="month-name">Lipiec</div><input onChange={validateInput} className="typ-zmieszane"></input><input onChange={validateInput} className="typ-szklo"></input><input onChange={validateInput} className="typ-plastik"></input><input onChange={validateInput} className="typ-papier"></input><input onChange={validateInput} className="typ-bio"></input><input onChange={validateInput} className="typ-gabaryt"></input></div>
            <div className="month 8"><div className="month-name">Sierpień</div><input onChange={validateInput} className="typ-zmieszane"></input><input onChange={validateInput} className="typ-szklo"></input><input onChange={validateInput} className="typ-plastik"></input><input onChange={validateInput} className="typ-papier"></input><input onChange={validateInput} className="typ-bio"></input><input onChange={validateInput} className="typ-gabaryt"></input></div>
            <div className="month 9"><div className="month-name">Wrzesień</div><input onChange={validateInput} className="typ-zmieszane"></input><input onChange={validateInput} className="typ-szklo"></input><input onChange={validateInput} className="typ-plastik"></input><input onChange={validateInput} className="typ-papier"></input><input onChange={validateInput} className="typ-bio"></input><input onChange={validateInput} className="typ-gabaryt"></input></div>
            <div className="month 10"><div className="month-name">Październik</div><input onChange={validateInput} className="typ-zmieszane"></input><input onChange={validateInput} className="typ-szklo"></input><input onChange={validateInput} className="typ-plastik"></input><input onChange={validateInput} className="typ-papier"></input><input onChange={validateInput} className="typ-bio"></input><input onChange={validateInput} className="typ-gabaryt"></input></div>
            <div className="month 11"><div className="month-name">Listopad</div><input onChange={validateInput} className="typ-zmieszane"></input><input onChange={validateInput} className="typ-szklo"></input><input onChange={validateInput} className="typ-plastik"></input><input onChange={validateInput} className="typ-papier"></input><input onChange={validateInput} className="typ-bio"></input><input onChange={validateInput} className="typ-gabaryt"></input></div>
            <div className="month 12"><div className="month-name">Grudzień</div><input onChange={validateInput} className="typ-zmieszane"></input><input onChange={validateInput} className="typ-szklo"></input><input onChange={validateInput} className="typ-plastik"></input><input onChange={validateInput} className="typ-papier"></input><input onChange={validateInput} className="typ-bio"></input><input onChange={validateInput} className="typ-gabaryt"></input></div>

            <div className="identificators">{areaId && <span>Identyfikator lokalizacji: {areaId}  </span>}
            {data && <span>  Identyfikator harmonogramu: {data.schedule._id}</span>}</div>
            <div className="save-buttons">{areaId && data && <button onClick={handleEdit}>Zapisz zmiany w harmonogramie</button>}
                {areaId && !data && <button onClick={handleAddNew}>Zapisz jako nowy harmonogram</button>}</div>
        </div>
    </div>
  );
}

export default PanelHarmonogram;
