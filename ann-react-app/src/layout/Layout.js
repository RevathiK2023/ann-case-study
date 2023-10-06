import React from 'react'
import MenuBar from '../components/navigations/MenuBar'

import SearchGeneric from '../components/search/SearchGeneric'

import './Layout.css'

const Layout = (props) => {
    return(
        <React.Fragment>
            <MenuBar signout={props.signout} user={props.user}/>

            <main className="main-content">
                
                <SearchGeneric signout={props.signout} user={props.user}/>
            </main>

       </React.Fragment>
    );
}

export default Layout;