import './singleComic.scss';
import { Link, Outlet, useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import ErrorTag from '../errorTag/ErrorTag';
import SpinnerLoad from '../spinnerLoad/SpinnerLoad';

const SingleComic = () => {
    const {comicId} = useParams();
    const [comic , setComic ] = useState(null)
    const { load , error, getComic , clearError } = useMarvelService()

    
    useEffect(()=>{
        updateComic()
    } , [comicId])

    let updateComic = () =>{ 
       clearError()
            getComic(comicId)
                .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const LoadedPage = load ? <SpinnerLoad/> : null ; 
    const ErrorPage = error ? <ErrorTag /> : null; 
    const content = !(error || load || !comic) ? <Views comic={comic}/> : null;

    return (
        <>
            {ErrorPage}
            {LoadedPage}
            {content}
        </>


    )
}

const Views = ({comic})=>{ 
    const {title, description, pageCount, thumbnail, language, price} = comic;
    return ( 
        <div className="single-comic">
        <img src={thumbnail} alt={title} className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pageCount}</p>
            <p className="single-comic__descr">Language: {language}</p>
            <div className="single-comic__price">{price}</div>
        </div>
        <Link end to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}


export default SingleComic;