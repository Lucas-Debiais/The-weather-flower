import React from 'react';
import './Header.scss';
import {GetCurrentDate, GetCurrentHour} from "../../utils/CurrentDate";

function Header() {
    return (
        <header>
            <h3>
                <GetCurrentHour/>
            </h3>
            <h4>
                <GetCurrentDate/>
            </h4>
        </header>
    );
}

export default Header;
