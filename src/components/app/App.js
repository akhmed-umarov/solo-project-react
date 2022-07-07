import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import {MainPage , ComicsPage , SingleComic } from '../pages'
import ErrorTag from "../errorTag/ErrorTag";


const App = ()=>{ 


    return ( 
        <Router>
        <div className="app">
        <AppHeader/>
            <main>
                <Routes>
                     <Route path={'/'} element={<MainPage/>}/>
                     <Route path={'comics'} element={<ComicsPage/>}/>
                     <Route path={'/comics/:comicId'} element={<SingleComic/>}/>
                     <Route path="*" element={<ErrorTag/>}/>
                </Routes>
            </main>   
        </div>
        </Router>
    )
}




export default App;