import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App.js';
import './style/style.scss';
// import MarvelService from './services/MarvelService.js';


// const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// const marvelService = new MarvelService();

// marvelService.getCharacter(1011052).then(({data})=> console.log(data));

// marvelService.getAllCharacters().then(res=> res.data.results.forEach(el => {console.log(el.name);}));

// marvelService.getAllCharacters().then(res=> res.data.results.forEach(el => {console.log(el.name);}));

ReactDOM.render(
<React.StrictMode>
  <App />
</React.StrictMode>
 , document.getElementById('root'))