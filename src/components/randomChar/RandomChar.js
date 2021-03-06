import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

class RandomChar extends Component { 
    constructor(props) { 
        super(props); 
        this.updateChar()
    }
    
    state = { 
        name: null, 
        description: null, 
        thumbnail: null,
        homepage: null ,
        wikipage: null
    }
    
    marvelService = new MarvelService(); 

    updateChar = () =>{  
        // const id = 1011005;
        const randId = Math.floor((Math.random() * 400) + 1011000)
        this.marvelService
            .getCharacter(randId)
                .then(res=> {
                    this.setState(res 
                        // name: res.data.results[0].name, 
                        // description: res.data.results[0].description,
                        // thumbnail: `${res.data.results[0].thumbnail.path}.${res.data.results[0].thumbnail.extension}`,
                        // homepage: res.data.results[0].urls[0].url,
                        // wikipage: res.data.results[0].urls[1].url
                    )
                })
    }
    

    render() { 
        const {name , description , thumbnail , homepage, wikipage } = this.state;
       return (
            <div className="randomchar">
                <div className="randomchar__block">
                {/* <img src={'../../resources/img/thor.jpeg'} alt="Random character" className="randomchar__img"/> */}
                <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
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

export default RandomChar;