import React, {useState} from 'react';
import './LoginPage.css'
import axios from "axios";
import config from "../../config";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";

function LoginPage() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const history = useHistory();

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: `${config.serverUrl}/api/companies/login`,
            data: {
                user: { email: email, password: password }
            }
        })
            .then((response) => {
                localStorage.setItem('smieci-token', JSON.stringify(response.data.user.token));
                history.push("/panel");
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    toast.error('Problem z połączeniem internetowym');
                } else {
                    toast.error(error.response.data);
                }
            });
    }

  return (
    <div className="LoginPage">

        <div className="LoginForm">
            <h3>Zaloguj się do panelu administarcyjnego</h3>

            <span>Email</span>
            <input type="text" onChange={() => setEmail(event.target.value)}/>

            <span>Hasło</span>
            <input type="password" onChange={() => setPassword(event.target.value)}/>

            <button className="Panel-login" onClick={handleSubmit}>Zaloguj się</button>

        </div>

    </div>
  );
}

export default LoginPage;
