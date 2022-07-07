import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import SpinnerLoad from '../spinnerLoad/SpinnerLoad';
import { useEffect  , useState } from 'react';
import ErrorTag from '../errorTag/ErrorTag';
import { Link } from 'react-router-dom';



const ComicsList = ()=> { 
    const [ArrayComics, setArrayComics] = useState([]); 
    const [loadNewComics , setLoadNewComics ] = useState(false);
    const [offset , setOffset] = useState(5);
    const {error , load , getAllComics } = useMarvelService();

    useEffect(()=>{
       onRequestListComics(offset , false)
    } , [])

    const loadedAllComics = (newComics)=>{
        setArrayComics([...ArrayComics , ...newComics]);
            setLoadNewComics(true);
                setOffset(()=>(offset+5))
    }


    const onRequestListComics = (offset , initial)=>{ 
        initial ? setLoadNewComics(true) : setLoadNewComics(false)
        getAllComics(offset)
            .then(loadedAllComics)
    }
    
    const comicses = Array.from(ArrayComics).map(({title , prices , id , thumbnail : {extension , path }})=>(
        <li className="comics__item" key={id}>
        <Link to={`${id}`}>
            <img src={`${path}.${extension}`} alt={title} className="comics__item-img"/>
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{prices[0].price}</div>
        </Link>
    </li>
    ))
        
    const errortag = error ? <ErrorTag/> : null;
    const spinner = (load && ArrayComics.length === 0) ? <SpinnerLoad/>  : null; 

    return (

        <div className="comics__list">
                 {spinner}
                 {errortag}
            <ul className="comics__grid">
                {comicses}
            </ul>
            <button className="button button__main button__long">
                <div disabled = {!loadNewComics} style={loadNewComics ? null : {opacity:'0.8'}} className="inner" onClick={()=>{onRequestListComics(offset)}}>load more</div>
            </button>
        </div>
    )
    
}

export default ComicsList;