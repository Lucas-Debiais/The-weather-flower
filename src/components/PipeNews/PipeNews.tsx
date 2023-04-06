import React from 'react';
import './PipeNews.scss';

function PipeNews() {
    return (
        <div className={'weather_block_information_container'}>
            <div className={'weather_block_information'}>
                <div className={'parameter thermometer'}>
                    <h5>Température</h5>
                </div>
                <p>19°</p>
                <h6>Similar to the actual temperature</h6>
            </div>
            <div className={'weather_block_information'}>
                <div className={'parameter moisture'}>
                    <h5>Humidité</h5>
                </div>
                <p>34%</p>
                <h6>The dew point is 17 right now</h6>
            </div>
            <div className={'weather_block_information'}>
                <div className={'parameter brightness'}>
                    <h5>Luminosité</h5>
                </div>
                <p>50%</p>
                <h6>Similar to the actual temperature</h6>
            </div>
        </div>
    );
}

export default PipeNews;
