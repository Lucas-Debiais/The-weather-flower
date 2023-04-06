import {useState} from 'react'
import {getCurrentDate} from './utils/CurrentDate'
import './App.scss'

function App() {
    return (
        <div className="App">
            <div className={'title'}>
                <h3>9:41 am</h3>
                <h4>Sunset Time, Wednesday</h4>
            </div>
            <div className={'weather_block_bg'}>
                <div className={'weather_block'}>
                    <div className={'cloud'}></div>
                    <h2>10°</h2>
                    <h3>Nantes, France</h3>
                </div>
            </div>
            <div className={'weather_block_information'}>
                <div className={''}>
                    <h5>Température</h5>
                </div>

            </div>
            {/*{getCurrentDate()}*/}
        </div>
    )
}

export default App
