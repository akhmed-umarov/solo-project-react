import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import SpinnerLoad from '../spinnerLoad/SpinnerLoad';
import ErrorTag from '../errorTag/ErrorTag';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

class CharInfo extends Component { 
    state = {
        char: null,
        load: false,
        error: false
    }

    marvelService = new MarvelService(); 

    componentDidMount(){ 
        this.updateChar()
    }

    ///get Derived state from error  запомнить
    // static getDerivedStateFromError() { 
    //     return { 
    //         error: true
    //     }
    // }
    //тут не  работает как и componentDidCatch, только в старых реактах , в новых надо класть эти методы в предохранителе

    componentDidUpdate(prevProps){ 


        /*-------------Error Boundaries (предохранители от ошибок) they catch three types of errors 1: if constructor has been error 2: render : life cycle-------------------*/ 
        //we try with error likes 3 types 

        
        // this.asdasd.asd()       //this is error

        if (this.props.charId !== prevProps.charId) { 
            this.updateChar()
        }
    }


    updateChar = () =>{ 
        const {charId} = this.props; 
        if (!charId) { 
            return;
        }
        this.onCharChange()
        this.marvelService 
            .getCharacter(charId)
                .then(this.onCharLoader)
                .catch(this.onError)
    }

    onCharLoader = (char) =>{ 
        this.setState({char , load: false})
    }

    onError = () => { 
        this.setState({error: true , load: false})
    }

    onCharChange = ()=>{ 
        this.setState({
            load: true
        })
    }


    render(){ 
        const {char , load , error} = this.state;

        const SkeletPage = char || load || error ?  null : <Skeleton/>; 
        const LoadedPage = load ? <SpinnerLoad/> : null ; 
        const ErrorPage = error ? <ErrorTag /> : null; 
        const charPage = !(error || load || !char) ? <View char={char}/> : null ; 



        return (
        <div className="char__info">
            {SkeletPage}
            {LoadedPage}
            {ErrorPage}
            {charPage}
        </div>
    )
    }



}


const View = ({char})=>{ 
    const {name ,  description , homepage , wikipage ,  thumbnail , comicsData : {items}} = char;

    const styleImg = (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") ? {objectFit: `contain`} : null ; 




    const comicsList = items.slice(0 , 9).map(({name} , id) => { 
        return (
        <ComicsItem key={id} text = {name}/>
        )   
    })





    return (
        <>
        <div className="char__basics">
                        <img style={styleImg} src={thumbnail} alt={name}/>
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <a href={homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wikipage} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">
                     {description.length < 1 ? `Not found data for this char` : description}
                    </div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                            {comicsList}
                    </ul>
        </>
    )
}


const ComicsItem = ({text})=>{ 

    return (
        <>
        <li className="char__comics-item">
        {text}
        </li>
        </>
    )
}



export default CharInfo;