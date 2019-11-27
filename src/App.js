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
import {searchCourse} from './Search.js';

//App Render
class App extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          isLoading: "hidden", // for spinner
          allCourses: [],
        }
    }

    componentDidMount() {
        this.setState({isLoading : ""});
        this.render();
        d3.csv(data)
        .then((data) => {
            //console.log(data);
            this.setState({allCourses: data})
        }).then(() => {
            //console.log(this.state);
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
    constructor(props) {
        super(props)
    
        this.state = {
          displayCourses: [],
          input: "",
          prereq: "",
          AofK: "",
          quarter: "",
          campus: "",
        }
    }

    form = (nameValueObj) => {
        this.setState(nameValueObj);
        console.log(this.state);
        
    }

    input = (newInput) => {
        this.setState(newInput);
    }

    data = (dataObj) => {
        this.setState(dataObj);
    }

    render() {
        return (
        <div id="course-page">
            <SearchField allCourses={this.props.allCourses} formCallback={this.form} dataCallback={this.data} inputCallback={this.input}
            input={this.state.input} prereq={this.state.prereq} AofK={this.state.AofK} quarter={this.state.quarter} campus={this.state.campus}/>
            <ResultField isLoading={this.props.isLoading} displayCourses={this.state.displayCourses}/>
        </div>
        );
    }
}

class SearchField extends Component {
    handleClick = (event) => {
        let filteredData = searchCourse(this.props.allCourses, this.props.input, this.props.AofK, this.props.quarter, this.props.campus);
        this.props.dataCallback({displayCourses : filteredData});
        event.preventDefault();
    }

    handleChange = (event) => {
        this.props.inputCallback({input : event.target.value});
    }

    render() {
        return(
            <section className="schedule">
                <h2>Find Recommended Courses</h2>      
                <form className="searchBox" role="search">
                    <input id="searchField" type="text" title="searchBox"
                        placeholder="Enter department code (e.g INFO)" onChange={this.handleChange} ></input>
                    <button onClick={this.handleClick} className="searchButton"><FontAwesomeIcon icon={faSearch} aria-label="search"/></button>
                </form>
                <Filter filters={FILTERS} formCallback={this.props.formCallback}/>
            </section>
        );
    }
}

class Filter extends Component {
    render() {
        let filterList = this.props.filters.map((element, i)=> {
            return (
                <FilterCard key={i} filter={element} formCallback={this.props.formCallback}/>
            );
        });
        // this.handleClick = () => this.props.updateFilterCallback(); // param
        return (
            <section className="subSection2">
                <h2>Filters</h2>
                <form>
                    {filterList}
                </form>
            </section>
        );
    }
}

class FilterCard extends Component {
    handleChange = (evt) => {
        console.log(evt.target.name, evt.target.value);
        this.Obj = { [evt.target.name]: evt.target.value };
        this.props.formCallback(this.Obj);
    }

    render() {
        let filter = this.props.filter;
        let choices = this.props.filter.element.map((choice, i) => {
            return (
               <p key={i}><input type={filter.type} name={filter.name} value={choice.value} onChange={this.handleChange}></input>{choice.content}<br></br></p>
            );
        });
        
    return (
        <div className="card"><h3>{filter.header}</h3>{choices}</div>
    );
    }
}


export default App;
