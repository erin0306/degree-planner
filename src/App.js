//Import Packages
import React, { Component } from 'react';
import { faGripLines, faHome, faBookOpen, faGraduationCap, faUserAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as d3 from 'd3';

//Import Local Files and Components
import { DashboardPage } from './Dashboard.js';
import { CoursePage } from './Courses.js'
import { Plan } from './Plan.js'
import {SignIn} from './SignIn.js'
import logo from './img/logo.png';
import data from './data/uwcourses.csv';

// Router
import { BrowserRouter as Router, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom';
//App Render
class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allCourses: [],
            page: "Dashboard"
        };
    }

    componentDidMount() {
        this.render();
        d3.csv(data)
            .then((data) => {
                this.setState({ allCourses: data })
            }).catch((error) => { alert(error) });
    }

    changePage = (newPage) => {
        this.setState({ page: newPage });
    }

    render() {
        return (
            <div className="body-flex">
                <div id="nav-element">
                    <RenderNav pageCallback={this.changePage} />
                </div>
                <RenderMain page={this.state.page} allCourses={this.state.allCourses} />
            </div>
        );
    }
}

class RenderNav extends Component {
    

    render() {
        return (
            <nav>
                <div className="logo">
                    <img src={logo} alt="logo"></img>
                </div>
                <ul>
                    <li ><NavLink to="/dashboard" activeClassName="activeLink"><FontAwesomeIcon icon={faHome} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Dashboard</NavLink></li>
                    <li><NavLink to="/findcourses" activeClassName="activeLink"><FontAwesomeIcon icon={faBookOpen} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Courses</NavLink></li>
                    <li><a href="#programs" role="tab"><FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" /><span>&nbsp;</span>Programs</a></li>
                    <li><NavLink to="/yourplan" activeClassName="activeLink"><FontAwesomeIcon icon={faUserAlt} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Your Plan</NavLink></li>                
                </ul>
            </nav>
        );
    }
}

class RenderMain extends Component {
    // choosePage() {
    //     if (this.props.page === "Courses") {
    //         return <CoursePage isLoading={this.props.isLoading} allCourses={this.props.allCourses} />
    //     }
    //     return <DashboardPage />
    // }

    render() {
        return (
            <div id="main-element">
                <header>
                    <h1>
                        <div className="dropdown">
                            <div><button id="hamburger-menu" className="nav-buttons"><FontAwesomeIcon icon={faGripLines} aria-label="Menu" /></button></div>
                            <div className="dropdown-content">
                                <nav>
                                    <ul>
                                        <li><NavLink to="/dashboard" activeClassName="activeLink"><FontAwesomeIcon icon={faHome} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Dashboard</NavLink></li>
                                        <li><NavLink to="/findcourses" activeClassName="activeLink"><FontAwesomeIcon icon={faBookOpen} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Courses</NavLink></li>
                                        <li><a href="#programs" role="tab"><FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" /><span>&nbsp;</span>Programs</a></li>
                                        <li><NavLink to="/yourplan" activeClassName="activeLink"><FontAwesomeIcon icon={faUserAlt} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Your Plan</NavLink></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        {this.props.page}
                        <div ><button className="nav-buttons"><FontAwesomeIcon icon={faSignOutAlt} aria-label="Sign out" /></button></div>
                    </h1>
                </header>

                <main>
                    {/* {this.choosePage()} */}
                    <Switch>
                        <Route path='/dashboard' component={DashboardPage} />
                        <Route path='/findcourses' render={(routerProps) => (
                            <CoursePage {...routerProps} allCourses={this.props.allCourses} />
                        )} />
                        <Route path='/yourplan' render={(routerProps) => (
                            <Plan {...routerProps} allCourses={this.props.allCourses} />
                        )} />
                        <Redirect to='/dashboard'/>
                    </Switch>
                </main>
                <footer>
                    <p><small>&copy; Copyright 2019, <a href="mailto:erinchang0306@gmail.com">Erin Chang</a>, <a
                        href="mailto:khoa.luong@yahoo.com.vn">Khoa Luong</a></small></p>
                </footer>
            </div>
        );
    }
}

export default App;
