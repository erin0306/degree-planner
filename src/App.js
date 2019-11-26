import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FILTERS from './filter.json';
import logo from './img/logo.png';

class App extends Component {
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
                    <li id="dashboard"><a href="#dashboard" role="tab"><i className="fas fa-columns"
                                aria-hidden="true"><span>&nbsp;&nbsp;</span></i>Dashboard</a></li>
                    <li id="courses"><a href="#courses" role="tab" className="active"><i className="fas fa-book-reader"
                                aria-hidden="true"></i><span>&nbsp;&nbsp;</span>Courses</a></li>
                    <li><a href="#programs" role="tab"><i className="fas fa-graduation-cap"
                                aria-hidden="true"></i><span>&nbsp;</span>Programs</a></li>
                    <li><a href="#profile" role="tab"><i className="fas fa-user-alt"
                                aria-hidden="true"></i><span>&nbsp;&nbsp;</span>Profile</a></li>
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
                        <div className="hamburger-menu"><a href="#"></a></div>
                        Courses<button><i className="fas fa-sign-out-alt" aria-label="Log out"></i></button>
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
                    <button className="searchButton"><i className="fa fa-search" aria-label="search"></i></button>
                </form>
                <Filter filters={FILTERS}/>
            </section>
        );
    }
}

class Filter extends Component {
    render() {
        let filterList = this.props.filters.map(element => {
            return (
                <FilterCard filter={element}/>
            );
        });
        return(
            <section className="subSection2">
                {filterList}
            </section>
        );
    }
}

class FilterCard extends Component {
    render() {
        let filter = this.props.filter;
        let choices = this.props.filter.element.map(choice => {
            console.log(choice);
            console.log(filter.type + " " + filter.name + " " + choice.value + " " + choice.content);
            return (
               <p><input type={filter.type} name={filter.name} value={choice.value}></input>{choice.content}<br></br></p>
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
