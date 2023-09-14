import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [sizeFile, setSizeFile] = useState(null);
  const [nameFile, setNameFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [progress, setProgress] = useState(0);



  // Fonction pour gérer le changement de fichier sélectionné
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setSizeFile(event.target.files[0].size);
  };

  // Fonction pour gérer le changement de fichier sélectionné
  const handleNameChange = (event) => {
    setNameFile(event.target.value);
  };

  const config = {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentCompleted);
            },
        };

  // Fonction pour effectuer la requête GET et obtenir l'URL
  const fetchFileUrl = async () => {
    try {

            const url = 'https://api.thecrossproduct.xyz/v1/data/generate_presigned_post';
            const requestOptions = {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body:  {"uri": nameFile,"size": sizeFile.toString()}
            };

          const response = await fetch(url, requestOptions);

          setFileUrl(response.data.url);
          console.log('post request : ',response.data.url)
          } catch (error) {
          console.error('Erreur lors de la récupération de l\'URL du serveur :', error);
        }
      };

  // Fonction pour envoyer le fichier vers l'URL obtenue
  const uploadFile = async () => {
    if (selectedFile && fileUrl) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.put(fileUrl, formData, config);
        const requestOptions = {
              method: 'PUT',
              body: formData
        };
        const response2 = await fetch(fileUrl, requestOptions);

        console.log('put request')
        setUploadStatus('Le fichier a été téléchargé avec succès !');
      } catch (error) {
        console.error('Erreur lors du téléchargement du fichier :', error);
        setUploadStatus('Erreur lors du téléchargement du fichier.');
      }
    } else {
      setUploadStatus('Veuillez sélectionner un fichier et obtenir l\'URL du serveur d\'abord.');
    }
  };

  return (
    <div>
      <h1>Uploader un fichier</h1>
      <input type="file" onChange={handleFileChange} />
      <input type="text" onChange={handleNameChange} />
      <button onClick={fetchFileUrl}>Obtenir l'URL du serveur</button>
      <button onClick={uploadFile}>Télécharger le fichier</button>
      <progress max="100" value={progress}></progress>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default App;
