//Import Packages
import React, {Component} from 'react';
import { faGripLines, faHome, faBookOpen, faGraduationCap, faUserAlt, faSignOutAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as d3 from 'd3';

//Import Local Files and Components
import {ResultField} from './Event'
import FILTERS from './filter.json';
import logo from './img/logo.png';
import data from './data/uwcourses.csv';

//App Render
class App extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          isLoading: "hidden", // for spinner
          allCourses: []
        }
    }

    componentDidMount() {
        this.setState({isLoading : ""});
        this.render();
        d3.csv(data)
        .then((data) => {
            console.log(data);
            this.setState({allCourses: data})
        }).then(() => {
            console.log(this.state);
            this.setState({isLoading : "hidden"});
            
        }).catch(console.log.bind(console));
    }

    render() {
        return (
            <div className="body-flex">
                <div id="element-1">
                    <RenderNav/>
                </div>
                
                <RenderMain isLoading={this.state.isLoading} allCourses={this.state.allCourses}/>
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
                    <li id="dashboard"><a href="#dashboard" role="tab"><FontAwesomeIcon icon={faHome} aria-hidden="true"/><span>&nbsp;&nbsp;</span>Dashboard</a></li>
                    <li id="courses"><a href="#courses" role="tab" className="active"><FontAwesomeIcon icon={faBookOpen} aria-hidden="true"/><span>&nbsp;&nbsp;</span>Courses</a></li>
                    <li><a href="#programs" role="tab"><FontAwesomeIcon icon={faGraduationCap} aria-hidden="true"/><span>&nbsp;</span>Programs</a></li>
                    <li><a href="#profile" role="tab"><FontAwesomeIcon icon={faUserAlt} aria-hidden="true"/><span>&nbsp;&nbsp;</span>Profile</a></li>
                </ul>
            </nav>
        );
    }
}

class RenderMain extends Component {
    render() {
        return (
            <div id="element-2">
                <header>
                    <h1>
                        <div className="hamburger-menu"><FontAwesomeIcon icon={faGripLines} aria-label="Menu"/></div>
                        Courses<button><FontAwesomeIcon icon={faSignOutAlt} aria-label="Sign out"/></button>
                    </h1>
                </header>
                <main>
                    <CoursePage isLoading={this.props.isLoading} allCourses={this.props.allCourses}/>
                </main>
                <footer>
                    <p><small>&copy; Copyright 2019, <a href="mailto:erinchang0306@gmail.com">Erin Chang</a>, <a
                                href="mailto:khoa.luong@yahoo.com.vn">Khoa Luong</a></small></p>
                </footer>
            </div>
        );
    }
}

class CoursePage extends Component {
    render() {
        return (
        <div id="course-page">
            <SearchField/>
            <ResultField isLoading={this.props.isLoading} allCourses={this.props.allCourses}/>
        </div>
        );
    }
}

class SearchField extends Component {
    render() {
        return(
            <section className="schedule">
                <h2>Find Recommended Courses</h2>      
                <form className="searchBox" role="search">
                    <input id="searchField" type="text" title="searchBox"
                        placeholder="Enter department code (e.g INFO)"></input>
                    <button onClick={this.handleClick} className="searchButton"><FontAwesomeIcon icon={faSearch} aria-label="search"/></button>
                </form>
                <Filter filters={FILTERS}/>
            </section>
        );
    }
}

class Filter extends Component {
    render() {
        let filterList = this.props.filters.map((element, i)=> {
            return (
                <FilterCard key={i} filter={element}/>
            );
        });
        return(
            <section className="subSection2">
                <h2>Filters</h2>
                <form>
                    {filterList}
                    <div className="card">
                        <button className="clickable" type="submit">Update Filter</button>
                    </div>
                </form>
            </section>
        );
    }
}

class FilterCard extends Component {
    render() {
        let filter = this.props.filter;
        let choices = this.props.filter.element.map((choice, i) => {
            return (
               <p key={i}><input type={filter.type} name={filter.name} value={choice.value}></input>{choice.content}<br></br></p>
            );
        });
    return <div className="card"><h3>{filter.header}</h3>{choices}</div>
    }
}


export default App;
