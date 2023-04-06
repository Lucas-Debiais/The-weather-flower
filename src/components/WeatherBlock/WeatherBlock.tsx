import React from 'react';
import './WeatherBlock.scss';
function WeatherBlock() {
    return (
        <div className={'weather_block_bg'}>
            <div className={'weather_block'}>
                <div className={'cloud'}></div>
                <h2>10°</h2>
                <h3>Nantes, France</h3>
            </div>
        </div>
    );
}

export default WeatherBlock;