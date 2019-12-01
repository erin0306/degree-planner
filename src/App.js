//Import Packages
import React, {Component} from 'react';
import { faGripLines, faHome, faBookOpen, faGraduationCap, faUserAlt, faSignOutAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as d3 from 'd3';

//Import Local Files and Components
import {ResultField} from './Data.js'
import FILTERS from './filter.json';
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
                <div id="element-1">
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
            <div id="element-2">
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

class DashboardPage extends Component {
    render() {
        return (
            <div id="dashboard-page">
                <div className="flex-container">
                    <section className="subSection">
                        <div className="profile">
                            <h2>Student Profile</h2>
                            <div className="card">
                                <h3>Khoa Nguyen Luong</h3>
                                <p>Junior</p>
                                <p>ID: 9999999</p>
                            </div>
                        </div>
                        <div className="profile">
                            <h2>Intended Major</h2>
                            <div className="card">
                                <h3>Informatics</h3>
                                <p>HCI Track</p>
                            </div>
                        </div>
                        <div className="profile">
                            <h2>Graduation Progress</h2>
                            <div className="card">
                                <h3>100 credits</h3>
                                <p>40 intended major credits</p>
                            </div>
                        </div>
                    </section>
                    <section className="subSection">
                        <h2>Current Courses</h2>
                        <div className="card">
                            <h3>INFO 201</h3>
                            <p>AU18 &vert; IS</p>
                        </div>
                        <div className="card">
                                <h3>INFO 200</h3>
                                <p>AU18 &vert; IS</p>
                        </div>
                        <div className="card">
                                <h3>CSE 142</h3>
                                <p>AU17 &vert; NW</p>
                        </div>
                        <div className="card">
                                <h3>CSE 143</h3>
                                <p>AU18 &vert; NW</p>
                        </div>
                        <div className="card">
                            <h3>ECON 200</h3>
                            <p>AU17 &vert; NW</p>
                        </div>
                        <div className="card">
                                <h3>ENGL 131</h3>
                                <p>AU17 &vert; C</p>
                        </div>
                        <div className="card">
                            <p>Click to reveal more</p>
                        </div>
                    </section>
                    <section className="subSection">
                        <h2>Future Courses</h2>
                        <div className="card">
                            <h3>MATH 126</h3>
                            <p>WIN19 &vert; NW</p>
                        </div>
                        <div className="card">
                                <h3>PSYCH 210</h3>
                                <p>WIN19 &vert; IS</p>
                        </div>
                        <div className="card">
                                <h3>INFO 340</h3>
                                <p>SPR19 &vert; NW</p>
                        </div>
                        <div className="card">
                                <h3>CSE 373</h3>
                                <p>WIN19 &vert; NW</p>
                        </div>
                        <div className="card">
                            <h3>INFO 360</h3>
                            <p>SPR19 &vert; VLPA</p>
                        </div>
                        <div className="card">
                            <h3>INFO 350</h3>
                            <p>SPR19 &vert; I&amp;S W</p>
                        </div>
                        <div className="card">
                            <p>Click to reveal more</p>
                        </div>
                    </section>
                </div>
                <section className="schedule">
                    <h2>Recommended Courses</h2>
                    <div className="clickable card">
                        <h3>INFO 340 Client-Side Development</h3>
                        <p>You have prereqs for this class: CSE 142 or CSE 143; and INFO 201</p>
                    </div>
                    <div className="clickable card">
                        <h3>EDUC 251 Seeking Educational Equity and Diversity</h3>
                        <p>Because you need DIV credits</p>
                    </div>
                    <div className="clickable card">
                        <h3>MKTG 301 Marketing Concepts</h3>
                        <p>You have prereqs for this class: ECON 200 <br></br>>
                            It is an eligible elective for your program</p>
                    </div>
                    <div className="clickable card">
                        <h3>INFO 350 Information Ethics And Policy</h3>
                        <p>It is a graduation requirement <br></br> Because you need W credits</p>
                    </div>
                </section>
            </div>
        );
    }
}

class CoursePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          displayCourses: []
        }
    }

    updateDisplay = (dataObj) => {
        this.setState(dataObj);
    }

    
    render() {
        return (
        <div id="course-page">
            <SearchField allCourses={this.props.allCourses} updateDisplayCallback={this.updateDisplay} inputCallback={this.updateInput}/>
            <ResultField isLoading={this.props.isLoading} displayCourses={this.state.displayCourses}/>
        </div>
        );
    }
}

class SearchField extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          input: "",
          prereq: "",
          AofK: "",
          quarter: "",
          campus: "",
        }
    }

    searchCourse = () => {
        let result = this.props.allCourses.filter(course => course["Department"].includes(this.state.input));
        result = result.filter(course => course["Areas of Knowledge"].includes(this.state.AofK));
        result = result.filter(course => course["Offered"].includes(this.state.quarter));
        result = result.filter(course => course["Campus"].includes(this.state.campus));
        return result;
    }

    updateForm = (nameValueObj) => {
        this.setState(nameValueObj, () => { 
            let filteredData = this.searchCourse();
            this.props.updateDisplayCallback({displayCourses : filteredData});
        });
    }

    updateInput = (newInput) => {
        this.setState(newInput);
    }

    resetFilter  = (event) => {
        let currentInput = this.state.input;
        this.setState({input: currentInput, prereq: "", AofK: "", quarter: "",  campus: "" }, () => { 
            let filteredData = this.searchCourse();
            this.props.updateDisplayCallback({displayCourses : filteredData});
        });
        event.preventDefault();
    }    

    handleClick = (event) => {
        let filteredData = this.searchCourse();
        this.props.updateDisplayCallback({displayCourses : filteredData});
        event.preventDefault();
    }

    handleChange = (event) => {
        this.updateInput({input : event.target.value});
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
                <Filter filters={FILTERS} formCallback={this.updateForm} resetFilterCallback={this.resetFilter}/>
                
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
        return (
            <section className="subSection2">
                <h2>Filters</h2>
                <form>
                    {filterList}
                    <div className="card">
                        <button id="reset-btn" onClick={this.props.resetFilterCallback}>Reset</button>
                    </div>
                </form>
            </section>
        );
    }
}

class FilterCard extends Component {
    handleChange = (evt) => {
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
