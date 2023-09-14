import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [mail, setMail] = useState('');
  const [passwd, setPasswd] = useState('');

  const handleLogin = async () => {


  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mail, passwd })
  };
    const response = await fetch('https://unstable.thecrossproduct.xyz/v1/auth/login_front', requestOptions);
    const cookieHeader = response.headers.get('Set-Cookie');

    if (cookieHeader) {
      // Des cookies sont présents dans la réponse
      console.log('Des cookies sont présents :', cookieHeader);
      console.log('Tous les cookies dans le navigateur :', document.cookie);
    } else {
      // Aucun cookie dans la réponse
      console.log('Aucun cookie dans la réponse');
    }
console.log(JSON.parse(JSON.stringify(response)));
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


