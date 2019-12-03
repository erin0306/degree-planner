//Import Packages
import React, {Component} from 'react';
import { faGripLines, faHome, faBookOpen, faGraduationCap, faUserAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as d3 from 'd3';

//Import Local Files and Components
import {DashboardPage} from './Dashboard.js';
import {CoursePage} from './Courses.js'
import logo from './img/logo.png';
import data from './data/uwcourses.csv';


//App Render
class App extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          isLoading: "hidden",
          allCourses: [],
          page: "Courses"
        }
    }

    componentDidMount() {
        this.setState({isLoading : ""});
        this.render();
        d3.csv(data)
        .then((data) => {
            this.setState({allCourses: data})
        }).then(() => {
            this.setState({isLoading : "hidden"});
            
        }).catch((error) => {alert(error)});
    }

    changePage = (newPage) => {
        this.setState({page : newPage});
    }

    render() {
        return (
            <div className="body-flex">
                <div id="nav-element">
                    <RenderNav pageCallback={this.changePage}/>
                </div>
                <RenderMain page={this.state.page} isLoading={this.state.isLoading} allCourses={this.state.allCourses}/>
            </div>
        );
    }
}

class RenderNav extends Component {
    handleClick = (evt) => {
        return this.props.pageCallback(evt.target.id);
    }

    render() {
        return (
            <nav>
                <div className="logo">
                    <img src={logo} alt="logo"></img>
                </div>
                <ul>
                    <li onClick={this.handleClick}><a href="#dashboard" id="Dashboard" role="tab"><FontAwesomeIcon icon={faHome} aria-hidden="true"/><span>&nbsp;&nbsp;</span>Dashboard</a></li>
                    <li onClick={this.handleClick}><a id="Courses" href="#courses" role="tab"><FontAwesomeIcon icon={faBookOpen} aria-hidden="true"/><span>&nbsp;&nbsp;</span>Courses</a></li>
                    <li><a href="#programs" role="tab"><FontAwesomeIcon icon={faGraduationCap} aria-hidden="true"/><span>&nbsp;</span>Programs</a></li>
                    <li><a href="#profile" role="tab"><FontAwesomeIcon icon={faUserAlt} aria-hidden="true"/><span>&nbsp;&nbsp;</span>Profile</a></li>
                </ul>
            </nav>
        );
    }
}

class RenderMain extends Component {
    choosePage() {
        if (this.props.page === "Courses") {
            return <CoursePage isLoading={this.props.isLoading} allCourses={this.props.allCourses}/>
        }
        return <DashboardPage/>
    }

    render() {
        return (
            <div id="main-element">
                <header>
                    <h1>
                        <div><button id="hamburger-menu" className="nav-buttons"><FontAwesomeIcon icon={faGripLines} aria-label="Menu"/></button></div>
                        {this.props.page}<div ><button className="nav-buttons"><FontAwesomeIcon icon={faSignOutAlt} aria-label="Sign out"/></button></div>
                    </h1>
                </header>
                <main>
                    {this.choosePage()}
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
