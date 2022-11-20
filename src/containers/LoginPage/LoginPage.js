import React, {useState} from 'react';
import './LoginPage.css'
import axios from "axios";
import config from "../../config";
import {useHistory} from "react-router-dom";

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
                    alert('Problem z połączeniem internetowym');
                } else {
                    alert(error.response.data);
                }
            });
    }

  return (
    <div className="LoginPage">

        <div className="LoginForm">
            <h3>Zaloguj się</h3>

            <span>Email</span>
            <input type="text" onChange={() => setEmail(event.target.value)}/>

            <span>Hasło</span>
            <input type="password" onChange={() => setPassword(event.target.value)}/>

            <button onClick={handleSubmit}>Zaloguj się</button>

        </div>

    </div>
  );
}

export default LoginPage;
