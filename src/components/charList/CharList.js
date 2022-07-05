import './charList.scss';
// import { useState } from 'react/cjs/react.production.min';
import React, { useEffect, useState  ,  useRef} from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorTag from '../errorTag/ErrorTag';
import SpinnerLoad from '../spinnerLoad/SpinnerLoad';
import PropTypes from 'prop-types';



const CharList = ({ onCharSelected } ) => { 

    const [ArrayChars, setArrayChars] = useState([]); 
    const [load , setLoad] = useState(true);
    const [error , setError] = useState(false);
    const [loadNewChar , setLoadNewChar ] = useState(false);
    const [offset , setOffset] = useState(260);

    const marvelService = useMarvelService(); 

    const loadedAllChars = (newChars)=>{ 
        setArrayChars(()=>[...newChars , ...ArrayChars]);
        setLoad(false);
        setLoadNewChar(false)
        setOffset(()=>(offset + 9))
    }
    useEffect(()=>{ 
    onRequstListChar()
    } , []);

    const onRequstListChar = (offset)=>{
        onLoadingNewCharsArray();
            marvelService
                .getAllCharacters(offset)
                    .then(loadedAllChars)
                    .catch(onError)
    }

    function onError () { 
        setError(true)
        setLoad(false)
    }
    function onLoadingNewCharsArray () { 
        setLoadNewChar(true)
    }


    // const { onCharSelected } = props; 

    const errorTag =  error ? <ErrorTag/> : null; 

    const contentChars = !( error || load || !ArrayChars) ? <Views ArrayChars = {ArrayChars}  onCharSelected = {onCharSelected} /> : null;

    const loading = !(error || !load || ArrayChars.length !== 0) ? <SpinnerLoad/> : null; 

    const styleBtnLoadNewChars = offset < 1565 ? (loadNewChar ? { opacity: 0.5 } : null) : {display: `none`}; 


    return ( 
        <div className="char__list">
        {loading}
        {errorTag}
        {contentChars}
        <button disabled={loadNewChar} style = {styleBtnLoadNewChars} className="button button__main button__long" onClick={()=> (onRequstListChar(offset))}>
            <div className="inner">load more</div>
        </button>
         </div>
    )

}

CharList.propTypes = { 
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;



const Views = ({ArrayChars , onCharSelected})=> {
    let ArrayRef = useRef([]);

    let onFocus = (id)=>{ 
        ArrayRef.current.forEach(el=>{ 
            el.classList.remove("char__item__active")
        })
            ArrayRef.current[id].classList.add("char__item__active")
            ArrayRef.current[id].focus()
    }

    let li = Array.from(ArrayChars).map(({id , name , thumbnail } , indexChar )=>{
        const styleImg = (thumbnail.path === `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available`) ? { objectFit: `contain` } : null;
        return (
        <li className="char__item" 
        onClick={()=>{
            onCharSelected(id) ;
            onFocus(indexChar) ;
                    }}
         tabIndex={0}
         onKeyDown = {(e)=>{if (e.key === "Enter") { 
            onFocus(indexChar)
         }}}
         ref = {(event)=>{ ArrayRef.current[indexChar]=event }} 
         key={id}>
        <img style={styleImg} src={`${thumbnail.path}.${thumbnail.extension}`} alt={name}/>
        <div className="char__name">{name}</div>
        </li>
        )

    })
    return (
        <>
        <ul className="char__grid">
            {li}
        </ul>
        </>
    )
}




