import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';


const CharItem = ({name , thumbnail})=>{ 
    return (
        <li className="char__item">
        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name}/>
        <div className="char__name">{name}</div>
        </li>
    )
}

class CharList extends Component {
    state = { 
        ArrayChars: {}
    }

    marvelService = new MarvelService(); 

    loadedAllChars = (ArrayChars)=>{ 
        this.setState({ArrayChars : ArrayChars})
    }

    updateArrayChars = ()=>{ 
        this.marvelService
            .getAllCharacters()
                .then(this.loadedAllChars)
    }

    componentDidMount() { 
    this.updateArrayChars();
    }
    


    render () {


        const {ArrayChars} = this.state;

        let li = Array.from(ArrayChars).map(({id , ...charDat})=> {
            return (
            <CharItem key={id} {...charDat}/>
            )
        })

        return (
        <div className="char__list">
            <ul className="char__grid">
                {li}
                {/* <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item char__item_selected">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li> */}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }
}

export default CharList;