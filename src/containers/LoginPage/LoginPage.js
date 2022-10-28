import React  from 'react';
import './LoginPage.css'

function LoginPage() {

  return (
    <div className="LoginPage">

        <div className="LoginForm">
            <h3>Zaloguj się</h3>

            <span>Email</span>
            <input type="text"/>

            <span>Hasło</span>
            <input type="password"/>

            <button>Zaloguj się</button>

        </div>

    </div>
  );
}

export default LoginPage;
