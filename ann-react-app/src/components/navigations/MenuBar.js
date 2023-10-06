import React from 'react'

import './MenuBar.css'

const MenuBar = (props) => {
    return (
        <nav className="header">
            <div className="nav-wrapper">
                <a className="logo" href='/'>ANN Traders</a>
                <ul className="menu">
                    <li>Welcome {props.user.username}&nbsp;&nbsp;&nbsp;</li>
                    <li><button onClick={props.signout}>Sign out</button></li>
                               
                </ul>
            </div>
        </nav>
    )
}

export default MenuBar;