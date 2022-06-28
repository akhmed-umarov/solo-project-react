import './charList.scss';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import ErrorTag from '../errorTag/ErrorTag';
import SpinnerLoad from '../spinnerLoad/SpinnerLoad';
import PropTypes from 'prop-types';

class CharList extends Component {

        state = {
            ArrayChars: [],
            load: true, 
            error: false, 
            loadNewChar: false,
            offset: 260
    }

    marvelService = new MarvelService(); 

    loadedAllChars = (newChars)=>{ 
        this.setState(({ArrayChars , offset})=>({
            ArrayChars : [...ArrayChars , ...newChars], 
            load: false , 
            loadNewChar: false, 
            offset: offset + 9 
        }))
    }

    componentDidMount() { 
        this.onRequstListChar();
    }
    
    onRequstListChar = (offset) =>{ 
        this.onLoadingNewCharsArray();
        this.marvelService
            .getAllCharacters(offset)
                 .then(this.loadedAllChars)
                 .catch(this.onError)
    }


    onError = () => { 
        this.setState({error: true , load: false})
    }

    onLoadingNewCharsArray = () =>{ 
        this.setState({loadNewChar: true})
    }

    render () {

        const { onCharSelected } = this.props; 
        const {ArrayChars , loadNewChar , error , load , offset} = this.state;

        const errorTag =  error ? <ErrorTag/> : null; 

        const contentChars = !( error || load || !ArrayChars) ? <Views ArrayChars = {ArrayChars}  onCharSelected = {onCharSelected}/> : null;

        const loading = !(error || !load || ArrayChars.length !== 0) ? <SpinnerLoad/> : null; 

        const styleBtnLoadNewChars = offset < 1565 ? (loadNewChar ? { opacity: 0.5 } : null) : {display: `none`}; 

        

        return (
        <div className="char__list">
            {loading}
            {errorTag}
            {contentChars}
            <button disabled={loadNewChar} style = {styleBtnLoadNewChars} className="button button__main button__long" onClick={()=> (this.onRequstListChar(offset))}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }
}

CharList.propTypes = { 
    onCharSelected: PropTypes.func.isRequired
}



export default CharList;

const Views = ({ArrayChars , onCharSelected}) => { 
    
    let li = Array.from(ArrayChars).map(({id , ...charDat})=> {
        return (
        <CharItem key={id} {...charDat} onCharSelected = {()=>{onCharSelected(id)}}/>
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




const CharItem = ({name , thumbnail , onCharSelected})=>{ 

    const styleImg = (thumbnail.path === `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available`) ? { objectFit: `contain` } : null;

    return (
        <li className="char__item" onClick={onCharSelected}>
        <img style={styleImg} src={`${thumbnail.path}.${thumbnail.extension}`} alt={name}/>
        <div className="char__name">{name}</div>
        </li>
    )
}