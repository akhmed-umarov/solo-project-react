import './charList.scss';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';



class CharList extends Component {
    constructor(props){ 
        super(props)
        this.state = {
            ArrayChars: {}  
    }
    }

    marvelService = new MarvelService(); 

    loadedAllChars = (ArrayChars)=>{ 
        this.setState({ArrayChars : ArrayChars })
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

        const { onCharSelected } = this.props; 
        const {ArrayChars} = this.state;

        let li = Array.from(ArrayChars).map(({id , ...charDat})=> {
            return (
            <CharItem key={id} {...charDat} onCharSelected = {()=>{onCharSelected(id)}}/>
            )
        })

        return (
        <div className="char__list">
            <ul className="char__grid">
                {li}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }
}

export default CharList;






const CharItem = ({name , thumbnail , onCharSelected})=>{ 

    const styleImg = (thumbnail.path === `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available`) ? { objectFit: `contain` } : null;

    return (
        <li className="char__item" onClick={onCharSelected}>
        <img style={styleImg} src={`${thumbnail.path}.${thumbnail.extension}`} alt={name}/>
        <div className="char__name">{name}</div>
        </li>
    )
}