import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import SpiinerLoad from '../spinnerLoad/SpinnerLoad';
import ErrorTag from '../errorTag/ErrorTag';


class RandomChar extends Component {   
    state = { 
        char: {},
        load: true,
        error: false
    }
    marvelService = new MarvelService(); 


    onCharLoader = (char) =>{ 
        this.setState({char: char , load: false})
    }

    onError = () => { 
        this.setState({error: true , load: false})

        ///От себя
    }
    onCharChange = ()=>{ 
        this.setState({
            load: true
        })
    }

    updateChar = () =>{  
        const randId = Math.floor((Math.random() * 400) + 1011000)
        this.onCharChange()
        this.marvelService
            .getCharacter(randId)
                .then(this.onCharLoader)
                .catch(this.onError)
    }
    


    componentDidMount() { 
        this.updateChar();
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
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
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