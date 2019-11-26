import React, {Component} from 'react';
import { faGripLines, faHome, faBookOpen, faGraduationCap, faUserAlt, faSignOutAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FILTERS from './filter.json';
import logo from './img/logo.png';
import * as d3 from 'd3';
import data from './data/uwcourses.csv';

class App extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          isLoading: true, // for spinner
          allCourses: []
        }
        
      }

    componentDidMount() {    
        d3.csv(data)
        .then((data) => {
            console.log(data);
            this.setState({allCourses: data})
        }).then(() => {
            console.log(this.state);
            // document.getElementById('spinner').style.display = 'none';
            // document.getElementById('course-page').style.display = '';
        }).catch(console.log.bind(console));
    }

    render() {
        return (
            <div className="body-flex">
                <div id="element-1">
                    <Nav/>
                </div>
                
                <Main/>
            </div>
        );
    }
}

class Nav extends Component {
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

class Main extends Component {
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
                    <CoursePage/>
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
            <ResultField/>
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
                    <button className="searchButton"><FontAwesomeIcon icon={faSearch} aria-label="search"/></button>
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
                {filterList}
                <div className="customCard">
                    <button type="submit">Update Filter</button>
                </div>
            </section>
        );
    }
}

class FilterCard extends Component {
    render() {
        let filter = this.props.filter;
        let choices = this.props.filter.element.map((choice, i) => {
            console.log(choice);
            console.log(filter.type + " " + filter.name + " " + choice.value + " " + choice.content);
            return (
               <p key={i}><input type={filter.type} name={filter.name} value={choice.value}></input>{choice.content}<br></br></p>
            );
        });
        console.log(" ");
    return <div className="customCard"><h3>{filter.header}</h3>{choices}</div>
    }
}

class ResultField extends Component {
    render() {
        return (
            <section className="subSection">
                <h2>Recommended Courses</h2>
            </section>
        )
    }
}
export default App;
