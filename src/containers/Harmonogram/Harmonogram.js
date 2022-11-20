import React, {useEffect, useState} from 'react';
import './Harmonogram.css'
import axios from "axios";
import config from "../../config";

function Harmonogram() {

    const [data, setData] = useState();
    const [isMobile, setIsMobile] = useState(window.innerWidth >= 576 ? false : true);
    const areaId = JSON.parse(localStorage.getItem('area'))._id;

    const JSONToSchedule = () =>{
        if(data){
            data.schedule.wywozy.map(element => {
                const singleCell = document.getElementsByClassName(`month ${element.miesiac}`)[0].getElementsByClassName(`typ-${element.typ}`)[0];
                console.log(singleCell)
                if(singleCell.textContent == ""){
                    singleCell.textContent += `${element.dzien}`
                } else {
                    singleCell.textContent += `,${element.dzien}`
                }
            })
        }
    }

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth >= 576 ? false : true)
        }
        window.addEventListener('resize', handleResize)

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
                    alert('Problem z połączeniem internetowym');
                } else {
                    alert(error.response.data);
                }
            });
    }, []);
    useEffect(() => {
        JSONToSchedule()
    }, [data]);
    useEffect(() => {
        JSONToSchedule()
    }, [isMobile]);


    return (
    <div className="Harmonogram">
        <div className="Header-container">
            <span className="Header1">Harmonogram wywozu dla:</span><br />
            {data && <span className="Header2">{data.schedule.obszar.kodpocztowy + " " + data.schedule.obszar.miejscowosc + ", " + data.schedule.obszar.ulica + " " + data.schedule.obszar.komentarz}</span> }
        </div>

        <div className="Schedule">

            { !isMobile && <>
            <div className="first-row"><div className="header-month-name">Miesiąc</div><div className="header-typ-zmieszane">Zmieszane</div><div className="header-typ-szklo">Szkło</div><div className="header-typ-plastik">Tworzywa sztuczne</div><div className="header-typ-papier">Papier</div><div className="header-typ-bio">Biodegradowalne</div><div className="header-typ-gabaryt">Wielkogabarytowe</div></div>
            <div className="month 1"><div className="month-name">Styczeń</div><div className="typ-zmieszane"></div><div className="typ-szklo"></div><div className="typ-plastik"></div><div className="typ-papier"></div><div className="typ-bio"></div><div className="typ-gabaryt"></div></div>
            <div className="month 2"><div className="month-name">Luty</div><div className="typ-zmieszane"></div><div className="typ-szklo"></div><div className="typ-plastik"></div><div className="typ-papier"></div><div className="typ-bio"></div><div className="typ-gabaryt"></div></div>
            <div className="month 3"><div className="month-name">Marzec</div><div className="typ-zmieszane"></div><div className="typ-szklo"></div><div className="typ-plastik"></div><div className="typ-papier"></div><div className="typ-bio"></div><div className="typ-gabaryt"></div></div>
            <div className="month 4"><div className="month-name">Kwiecień</div><div className="typ-zmieszane"></div><div className="typ-szklo"></div><div className="typ-plastik"></div><div className="typ-papier"></div><div className="typ-bio"></div><div className="typ-gabaryt"></div></div>
            <div className="month 5"><div className="month-name">Maj</div><div className="typ-zmieszane"></div><div className="typ-szklo"></div><div className="typ-plastik"></div><div className="typ-papier"></div><div className="typ-bio"></div><div className="typ-gabaryt"></div></div>
            <div className="month 6"><div className="month-name">Czerwiec</div><div className="typ-zmieszane"></div><div className="typ-szklo"></div><div className="typ-plastik"></div><div className="typ-papier"></div><div className="typ-bio"></div><div className="typ-gabaryt"></div></div>
            <div className="month 7"><div className="month-name">Lipiec</div><div className="typ-zmieszane"></div><div className="typ-szklo"></div><div className="typ-plastik"></div><div className="typ-papier"></div><div className="typ-bio"></div><div className="typ-gabaryt"></div></div>
            <div className="month 8"><div className="month-name">Sierpień</div><div className="typ-zmieszane"></div><div className="typ-szklo"></div><div className="typ-plastik"></div><div className="typ-papier"></div><div className="typ-bio"></div><div className="typ-gabaryt"></div></div>
            <div className="month 9"><div className="month-name">Wrzesień</div><div className="typ-zmieszane"></div><div className="typ-szklo"></div><div className="typ-plastik"></div><div className="typ-papier"></div><div className="typ-bio"></div><div className="typ-gabaryt"></div></div>
            <div className="month 10"><div className="month-name">Październik</div><div className="typ-zmieszane"></div><div className="typ-szklo"></div><div className="typ-plastik"></div><div className="typ-papier"></div><div className="typ-bio"></div><div className="typ-gabaryt"></div></div>
            <div className="month 11"><div className="month-name">Listopad</div><div className="typ-zmieszane"></div><div className="typ-szklo"></div><div className="typ-plastik"></div><div className="typ-papier"></div><div className="typ-bio"></div><div className="typ-gabaryt"></div></div>
            <div className="month 12"><div className="month-name">Grudzień</div><div className="typ-zmieszane"></div><div className="typ-szklo"></div><div className="typ-plastik"></div><div className="typ-papier"></div><div className="typ-bio"></div><div className="typ-gabaryt"></div></div>
            </>}

            {isMobile && <>
                <div className="month 1"><div className="month-label">Miesiąc</div><div className="month-name">Styczeń</div><div className="zmieszane-label">Zmieszane</div><div className="typ-zmieszane"></div><div className="szklo-label">Szkło</div><div className="typ-szklo"></div><div className="plastik-label">Tworzywa sztuczne</div><div className="typ-plastik"></div><div className="papier-label">Papier</div><div className="typ-papier"></div><div className="bio-label">Biodegradowalne</div><div className="typ-bio"></div><div className="gabaryt-label">Wielkogabarytowe</div><div className="typ-gabaryt"></div></div>
                <div className="month 2"><div className="month-label">Miesiąc</div><div className="month-name">Luty</div><div className="zmieszane-label">Zmieszane</div><div className="typ-zmieszane"></div><div className="szklo-label">Szkło</div><div className="typ-szklo"></div><div className="plastik-label">Tworzywa sztuczne</div><div className="typ-plastik"></div><div className="papier-label">Papier</div><div className="typ-papier"></div><div className="bio-label">Biodegradowalne</div><div className="typ-bio"></div><div className="gabaryt-label">Wielkogabarytowe</div><div className="typ-gabaryt"></div></div>
                <div className="month 3"><div className="month-label">Miesiąc</div><div className="month-name">Marzec</div><div className="zmieszane-label">Zmieszane</div><div className="typ-zmieszane"></div><div className="szklo-label">Szkło</div><div className="typ-szklo"></div><div className="plastik-label">Tworzywa sztuczne</div><div className="typ-plastik"></div><div className="papier-label">Papier</div><div className="typ-papier"></div><div className="bio-label">Biodegradowalne</div><div className="typ-bio"></div><div className="gabaryt-label">Wielkogabarytowe</div><div className="typ-gabaryt"></div></div>
                <div className="month 4"><div className="month-label">Miesiąc</div><div className="month-name">Kwiecień</div><div className="zmieszane-label">Zmieszane</div><div className="typ-zmieszane"></div><div className="szklo-label">Szkło</div><div className="typ-szklo"></div><div className="plastik-label">Tworzywa sztuczne</div><div className="typ-plastik"></div><div className="papier-label">Papier</div><div className="typ-papier"></div><div className="bio-label">Biodegradowalne</div><div className="typ-bio"></div><div className="gabaryt-label">Wielkogabarytowe</div><div className="typ-gabaryt"></div></div>
                <div className="month 5"><div className="month-label">Miesiąc</div><div className="month-name">Maj</div><div className="zmieszane-label">Zmieszane</div><div className="typ-zmieszane"></div><div className="szklo-label">Szkło</div><div className="typ-szklo"></div><div className="plastik-label">Tworzywa sztuczne</div><div className="typ-plastik"></div><div className="papier-label">Papier</div><div className="typ-papier"></div><div className="bio-label">Biodegradowalne</div><div className="typ-bio"></div><div className="gabaryt-label">Wielkogabarytowe</div><div className="typ-gabaryt"></div></div>
                <div className="month 6"><div className="month-label">Miesiąc</div><div className="month-name">Czerwiec</div><div className="zmieszane-label">Zmieszane</div><div className="typ-zmieszane"></div><div className="szklo-label">Szkło</div><div className="typ-szklo"></div><div className="plastik-label">Tworzywa sztuczne</div><div className="typ-plastik"></div><div className="papier-label">Papier</div><div className="typ-papier"></div><div className="bio-label">Biodegradowalne</div><div className="typ-bio"></div><div className="gabaryt-label">Wielkogabarytowe</div><div className="typ-gabaryt"></div></div>
                <div className="month 7"><div className="month-label">Miesiąc</div><div className="month-name">Lipiec</div><div className="zmieszane-label">Zmieszane</div><div className="typ-zmieszane"></div><div className="szklo-label">Szkło</div><div className="typ-szklo"></div><div className="plastik-label">Tworzywa sztuczne</div><div className="typ-plastik"></div><div className="papier-label">Papier</div><div className="typ-papier"></div><div className="bio-label">Biodegradowalne</div><div className="typ-bio"></div><div className="gabaryt-label">Wielkogabarytowe</div><div className="typ-gabaryt"></div></div>
                <div className="month 8"><div className="month-label">Miesiąc</div><div className="month-name">Sierpień</div><div className="zmieszane-label">Zmieszane</div><div className="typ-zmieszane"></div><div className="szklo-label">Szkło</div><div className="typ-szklo"></div><div className="plastik-label">Tworzywa sztuczne</div><div className="typ-plastik"></div><div className="papier-label">Papier</div><div className="typ-papier"></div><div className="bio-label">Biodegradowalne</div><div className="typ-bio"></div><div className="gabaryt-label">Wielkogabarytowe</div><div className="typ-gabaryt"></div></div>
                <div className="month 9"><div className="month-label">Miesiąc</div><div className="month-name">Wrzesień</div><div className="zmieszane-label">Zmieszane</div><div className="typ-zmieszane"></div><div className="szklo-label">Szkło</div><div className="typ-szklo"></div><div className="plastik-label">Tworzywa sztuczne</div><div className="typ-plastik"></div><div className="papier-label">Papier</div><div className="typ-papier"></div><div className="bio-label">Biodegradowalne</div><div className="typ-bio"></div><div className="gabaryt-label">Wielkogabarytowe</div><div className="typ-gabaryt"></div></div>
                <div className="month 10"><div className="month-label">Miesiąc</div><div className="month-name">Październik</div><div className="zmieszane-label">Zmieszane</div><div className="typ-zmieszane"></div><div className="szklo-label">Szkło</div><div className="typ-szklo"></div><div className="plastik-label">Tworzywa sztuczne</div><div className="typ-plastik"></div><div className="papier-label">Papier</div><div className="typ-papier"></div><div className="bio-label">Biodegradowalne</div><div className="typ-bio"></div><div className="gabaryt-label">Wielkogabarytowe</div><div className="typ-gabaryt"></div></div>
                <div className="month 11"><div className="month-label">Miesiąc</div><div className="month-name">Listopad</div><div className="zmieszane-label">Zmieszane</div><div className="typ-zmieszane"></div><div className="szklo-label">Szkło</div><div className="typ-szklo"></div><div className="plastik-label">Tworzywa sztuczne</div><div className="typ-plastik"></div><div className="papier-label">Papier</div><div className="typ-papier"></div><div className="bio-label">Biodegradowalne</div><div className="typ-bio"></div><div className="gabaryt-label">Wielkogabarytowe</div><div className="typ-gabaryt"></div></div>
                <div className="month 12"><div className="month-label">Miesiąc</div><div className="month-name">Grudzień</div><div className="zmieszane-label">Zmieszane</div><div className="typ-zmieszane"></div><div className="szklo-label">Szkło</div><div className="typ-szklo"></div><div className="plastik-label">Tworzywa sztuczne</div><div className="typ-plastik"></div><div className="papier-label">Papier</div><div className="typ-papier"></div><div className="bio-label">Biodegradowalne</div><div className="typ-bio"></div><div className="gabaryt-label">Wielkogabarytowe</div><div className="typ-gabaryt"></div></div>
            </>}

        </div>
    </div>
  );
}

export default Harmonogram;
