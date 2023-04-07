import React, {useEffect, useState} from 'react';
import './PipeNews.scss';


function PipeNews(): JSX.Element {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch('http://localhost:3000/api/data')
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Erreur de chargement du fichier CSV');
            })
            .then(data => {
                setData(JSON.parse(data)[0])
            })
            .catch(error => {
                console.error('Erreur : ', error);
            });
    }, [])

    console.log(data)
    return (
        <div className={'weather_block_information_container'}>
            <div className={'weather_block_information'}>
                <div className={'parameter thermometer'}>
                    <h5>Température</h5>
                </div>
                <p>{data.temp}°</p>
                <h6>Similar to the actual temperature</h6>
            </div>
            <div className={'weather_block_information'}>
                <div className={'parameter moisture'}>
                    <h5>Humidité</h5>
                </div>
                <p>{data.moist}%</p>
                <h6>The dew point is 17 right now</h6>
            </div>
            <div className={'weather_block_information'}>
                <div className={'parameter brightness'}>
                    <h5>Luminosité</h5>
                </div>
                <p>{data.bright}%</p>
                <h6>Similar to the actual temperature</h6>
            </div>
        </div>
    );
}

export default PipeNews;
