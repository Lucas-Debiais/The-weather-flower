import React from 'react';
import './Footer.scss'

function Footer() {
    return (
        <footer>
            <div className={'informations'}>
                <div className={'informations_container presentation'}>
                    <div className={'picture'}>
                        <div className={'profil lucas'}></div>
                        <div className={'profil baptiste'}></div>
                    </div>
                    <div className={'name'}>
                        <h5>Lucas Debiais</h5>
                        <h5>Baptiste Montécot</h5>
                    </div>
                </div>
                <div className={'informations_container school'}>
                    <h5>ECV Digital Nantes</h5>
                </div>
            </div>
        </footer>
    );
}

export default Footer;