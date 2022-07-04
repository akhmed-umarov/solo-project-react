import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {  useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import SpinnerLoad from '../spinnerLoad/SpinnerLoad';
import ErrorTag from '../errorTag/ErrorTag';




const RandomChar =()=>{ 
    const [char , setChar] = useState({}); 
    const [load , setLoad] = useState(true);
    const [error , setError] = useState(false);

    let marvelService = new MarvelService(); 

   let onCharLoader = (NewChar) =>{ 
        setChar(NewChar);
        setLoad(false)
    }
    function onError () { 
        setError(true)
        setLoad(false)
    }

    function onCharChange (){
        setLoad(true)
    }

    let updateChar = () =>{  
        const randId = Math.floor((Math.random() * 400) + 1011000)
        onCharChange()
        marvelService
            .getCharacter(randId)
                .then(onCharLoader)
                .catch(onError)
    }

    useEffect(()=>{ 
       updateChar();
    }, [])

    const LoadedPage = load ? <SpinnerLoad/> : null ; 
    const ErrorPage = error ? <ErrorTag /> : null; 
    const charPage = !(error || load) ? <View char={char}/> : null ; 

    return (
        <div className="randomchar">
            {LoadedPage}
            {charPage}
            {ErrorPage}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}


const View = ({char}) => { 
    const {name , description , homepage , wikipage , thumbnail} = char;

    return (
        <div className="randomchar__block">
                <img style={thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? {objectFit: 'contain'} : null}
                src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {String(description).length > 0 ? (String(description).length > 10 ? `${String(description).slice(0 , 200)}...` : description) : `Not found data for this char`}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wikipage} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;