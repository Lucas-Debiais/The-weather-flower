import './App.scss'
import Footer from './components/Footer/Footer';
import Header from "./components/Header/Header";
import WeatherBlock from "./components/WeatherBlock/WeatherBlock";
import PipeNews from "./components/PipeNews/PipeNews";

function App() {
    return (
        <div className="App">
            <Header/>
            <WeatherBlock/>
            <PipeNews/>
            <Footer/>
        </div>
    )
}

export default App
