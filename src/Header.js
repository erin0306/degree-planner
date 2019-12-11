import React, { Component } from 'react';
import { faSpinner, faGripLines, faHome, faBookOpen, faGraduationCap, faUserAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BrowserRouter as Router, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom';


export class Header extends Component {
    render () {

        return (
            <header>
                    <h1>
                        <div className="dropdown">
                            <div><button id="hamburger-menu" className="nav-buttons"><FontAwesomeIcon icon={faGripLines} aria-label="Menu" /></button></div>
                            <div className="dropdown-content">
                                <nav>
                                    <ul>
                                        <li><NavLink to="/dashboard" activeClassName="activeLink"><FontAwesomeIcon icon={faHome} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Dashboard</NavLink></li>
                                        <li><NavLink to="/findcourses" activeClassName="activeLink"><FontAwesomeIcon icon={faBookOpen} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Courses</NavLink></li>
                                        <li><NavLink to="/findprograms" activeClassName="activeLink"><FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" /><span>&nbsp;</span>Programs</NavLink></li>
                                        <li><NavLink to="/yourplan" activeClassName="activeLink"><FontAwesomeIcon icon={faUserAlt} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Your Plan</NavLink></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        {this.props.page}
                        <div ><button className="nav-buttons"><FontAwesomeIcon icon={faSignOutAlt} aria-label="Sign out" onClick={this.props.signoutCallback} /></button></div>
                    </h1>
                </header>
        )
    }

}