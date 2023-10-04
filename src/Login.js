import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [mail, setMail] = useState('');
  const [passwd, setPasswd] = useState('');

  const handleLogin = async () => {


  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'credentials' : 'include',
    },
    body: JSON.stringify({ mail, passwd })
  };
    const response = await fetch('http://127.0.0.1:8000/v1/auth/login_front', requestOptions);
   // const response = await fetch('http://127.0.0.4:8000/v1/auth/login_front', requestOptions);
  console.log(JSON.parse(JSON.stringify(response)));
  const cookies = response.headers.get('Set-Cookie');
  if (cookies) {
      // Vous pouvez maintenant travailler avec les cookies, par exemple en les divisant en un tableau
      const cookieArray = cookies.split(';');
      console.log(cookieArray);
    }

  };






  return (
    <div>
      <h1>Authentification</h1>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      <input
        type="passwd"
        placeholder="Mot de passe"
        value={passwd}
        onChange={(e) => setPasswd(e.target.value)}
      />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}

export default Login;


