import './page-header.css';
import React from 'react';
import {NavLink} from 'react-router-dom';

function PageHeader () {

    const taglines = ['Where Truth Lives', 'We Are The Future', 'Adapt or Perish', 'Listen and Believe']

    return (
        <header className="PageHeader">
            <h1>NCNews</h1>
            <h3>{taglines[Math.floor(Math.random() * taglines.length)]}</h3>
            <br/>
            <nav>
                <NavLink exact to="/topics/all" activeClassName="selected-navigation-link">
                    <div className="navigation-link">
                        All
                    </div>
                </NavLink>
                <NavLink to="/topics/coding" activeClassName="selected-navigation-link">
                    <div className="navigation-link">
                        Coding
                    </div>
                </NavLink>
                <NavLink to="/topics/cooking" activeClassName="selected-navigation-link">
                    <div className="navigation-link">
                        Cooking
                    </div>
                </NavLink>
                <NavLink to="/topics/football" activeClassName="selected-navigation-link">                
                    <div className="navigation-link">
                        Football
                    </div>
                </NavLink>
            </nav>
        </header>
    );
}

export default PageHeader;