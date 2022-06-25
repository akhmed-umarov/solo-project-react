import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import SpiinerLoad from '../spinnerLoad/SpinnerLoad';
import ErrorTag from '../errorTag/ErrorTag';


class RandomChar extends Component { 
    constructor(props) { 
        super(props); 
        // this.updateChar();
    }
    
    state = { 
        char: {},
        load: true,
        error: false
        // name: null, 
        // description: null, 
        // thumbnail: null,
        // homepage: null,
        // wikipage: null
    }
    
    marvelService = new MarvelService(); 

    onChatLoader = (char) =>{ 
        // this.setState({char: char})
        this.setState({char: char , load: false})
    }

    onError = () => { 
        this.setState({error: true , load: false})
    }

    updateChar = () =>{  
        // const id = 1011005;
        const randId = Math.floor((Math.random() * 400) + 1011000)
        this.marvelService
            .getCharacter(randId)
                .then(this.onChatLoader)
                .catch(this.onError)
                // .then(char=> {
                    // this.setState(
                    //     char 
                                //     // name: res.data.results[0].name, 
                                //     // description: res.data.results[0].description,
                                //     // thumbnail: `${res.data.results[0].thumbnail.path}.${res.data.results[0].thumbnail.extension}`,
                                //     // homepage: res.data.results[0].urls[0].url,
                                //     // wikipage: res.data.results[0].urls[1].url
                                // )
                // })
    }
    

    render() { 
    const { char , load , error } = this.state;
    
    const LoadedPage = load ? <SpiinerLoad/> : null ; 
    
    const ErrorPage = error ? <ErrorTag /> : null; 

    const charPage = !(error || load) ? <View char={char}/> : null ; 
    

       return (
            <div className="randomchar">
                {LoadedPage}
                {charPage}
                {ErrorPage}
                {/* <View char={char}/> */}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}


const View = ({char}) => { 
    const {name , description , homepage , wikipage , thumbnail} = char;
    return (
        <div className="randomchar__block">
                {/* <img src={'../../resources/img/thor.jpeg'} alt="Random character" className="randomchar__img"/> */}
                <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {String(description).length > 0 ? (String(description).length > 10 ? `${String(description).slice(0 , 150)}...` : description) : `Not found data for this char`}
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