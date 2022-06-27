import './charList.scss';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import ErrorTag from '../errorTag/ErrorTag';



class CharList extends Component {
    constructor(props){ 
        super(props)
        this.state = {
            ArrayChars: [],
            load: true, 
            error: false, 
            loadNewChar: false,
            offset: 260
    }
    }

    marvelService = new MarvelService(); 

    loadedAllChars = (newChars)=>{ 
        this.setState(({ArrayChars , offset })=>({
            ArrayChars : [...ArrayChars , ...newChars], 
            load: false , 
            offset: offset + 9
        }))
    }

    updateArrayChars = ()=>{ 
       this.onRequstListChar(this.state.offset)
    }

    componentDidMount() { 
    this.updateArrayChars();
    }
    
    onRequstListChar = (offset) =>{ 
        this.onStartCharsLoading()
        this.marvelService
            .getAllCharacters(offset)
                 .then(this.loadedAllChars)
                 .catch(this.onError)
    }


    onStartCharsLoading = () =>{ 
        this.setState({load: true})
    }

    onError = () => { 
        this.setState({error: true , load: false})
    }

    onLoadingNewCharsArray = () =>{ 
        this.setState({loadNewChar: true})
    }

    render () {

        const { onCharSelected } = this.props; 
        const {ArrayChars , offset , loadNewChar , error , load} = this.state;

        // const ErorTag =  (error || !load || !ArrayChars ) ? <ErrorTag/> : null; 
        // const ContentChars = !( error || load || !ArrayChars) ? 
        //лень пока что делатьзагрузки и ошибки


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
            <button className="button button__main button__long" onClick={()=> (this.onRequstListChar(offset))}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }
}

export default CharList;

const Views = () => { 
    return ( 
        `asd`
    )
}




const CharItem = ({name , thumbnail , onCharSelected})=>{ 

    const styleImg = (thumbnail.path === `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available`) ? { objectFit: `contain` } : null;

    return (
        <li className="char__item" onClick={onCharSelected}>
        <img style={styleImg} src={`${thumbnail.path}.${thumbnail.extension}`} alt={name}/>
        <div className="char__name">{name}</div>
        </li>
    )
}