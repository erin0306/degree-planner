import React, { Component } from 'react';
import firebase from 'firebase/app';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowAltCircleDown, faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";

import { Header } from './Header.js'
import { Footer } from './Footer.js'

//Import Local Files and Components
import { ResultField } from './Data.js';
import FILTERS from './filter.json';

export class CoursePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayCourses: [],
            completed: [],
        }
    }

    componentDidMount() {
        this.completedRef = firebase.database().ref(this.props.user.uid).child('completedCourses');
        this.completedRef.on('value', (snapshot) => {
            let obj = snapshot.val();
            this.setState({ completed: obj }); 
        })
    }
    componentWillUnmount() {
        this.completedRef.off();
    }

    updateDisplay = (prereq, input, AofK, quarter, campus) => {

        let result = this.props.allCourses.filter(course => course["Department"].includes(input.toUpperCase()));
        result = result.filter(course => course["Areas of Knowledge"].includes(AofK));
        result = result.filter(course => course["Offered"].includes(quarter));
        result = result.filter(course => course["Campus"].includes(campus));
        if (prereq) { 
            let completedKeys = [];
            if (this.state.completed) { // filter with completed courses if user has any
                completedKeys = Object.keys(this.state.completed);
            }
            result = result.filter(course => {
                let includes = false;
                for (let i = 0; i < completedKeys.length; i++) {
                    if(course["Prerequisites"].includes(completedKeys[i])) {
                        includes = true;
                    }
                }
                return (includes || course["Prerequisites"] === ""); // eligible courses or courses without any prereqs
            });
        }
        this.setState({ displayCourses: result });
    }

    render() {
        return (
            <div id="main-element">
                <Header page={"Courses"}  signoutCallback={this.props.signoutCallback}/>
                <main>
                    <div id="course-page">
                        <SearchField  allCourses={this.props.allCourses} updateDisplayCallback={this.updateDisplay} inputCallback={this.updateInput} />
                        <ResultField  user={this.props.user}  displayCourses={this.state.displayCourses} />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

class SearchField extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input: "",
            prereq: false,
            AofK: "",
            quarter: "",
            campus: "",
            filterHidden: false
        }
    }

    updateForm = (nameValueObj) => {
        this.setState(nameValueObj, () => {
                this.props.updateDisplayCallback(this.state.prereq, this.state.input, this.state.AofK, this.state.quarter, this.state.campus);
        });
    }

    updateInput = (newInput) => {
        this.setState(newInput);
    }

    resetFilter = (event) => {
        let currentInput = this.state.input;
        this.setState({ input: currentInput, prereq: "", AofK: "", quarter: "", campus: "" });
        // event.preventDefault();
    }

    handleClick = (event) => {
        this.props.updateDisplayCallback(this.state.prereq, this.state.input, this.state.AofK, this.state.quarter, this.state.campus);
        event.preventDefault();
    }

    handleChange = (event) => {
        this.updateInput({ input: event.target.value });
    }

    render() {
        return (
            <section className="schedule">
                <h2>Find Recommended Courses</h2>
                <form className="searchBox" role="search">
                    <input id="searchField" type="text" title="searchBox"
                        placeholder="Enter department code (e.g INFO)" onChange={this.handleChange} ></input>
                    <button onClick={this.handleClick} className="searchButton"><FontAwesomeIcon icon={faSearch} aria-label="search" /></button>
                </form>
                <Filter filters={FILTERS} formCallback={this.updateForm} resetFilterCallback={this.resetFilter} />
            </section> 
        );
    }
}

class Filter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filterHidden: true
        }
    }

    showFilter = (event) => {
        this.setState({filterHidden : !this.state.filterHidden});
        event.preventDefault();
    }

    render() {
        let filterList = this.props.filters.map((element, key) => {
            return (
                <FilterCard key={key} filter={element} formCallback={this.props.formCallback} />
            );
        });

        return (
            <section className="subSection2">
                <h2 onClick={this.showFilter}>Filters <FontAwesomeIcon icon={this.state.filterHidden ? faArrowAltCircleDown : faArrowAltCircleUp} aria-label={this.state.filterHidden? "expand filter" : "hide filter"} /> </h2> 
                <form className={this.state.filterHidden? "hidden" : ""}>
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
    constructor(props) {
        super(props);
        this.state = { prereqChecked: false };
    }

    handleChange = (evt) => {
        evt.persist();
        if(evt.target.name === 'prereq') { // if prereq filter is clicked
            this.setState({prereqChecked: !this.state.prereqChecked}, ()=> {
            this.Obj = { [evt.target.name]: this.state.prereqChecked };
            this.props.formCallback(this.Obj);
            })
        } else {
            this.Obj = { [evt.target.name]: evt.target.value };
            this.props.formCallback(this.Obj);
        }
        
    }

    render() {
        let filter = this.props.filter;
        let choices = this.props.filter.element.map((choice) => {
            return (
                <p key={choice.value}><input type={filter.type} defaultChecked={this.state.prereqChecked} name={filter.name} value={choice.value} onChange={this.handleChange}></input>{choice.content}<br></br></p>
            );
        });

        return (
            <div className="card"><h3>{filter.header}</h3>{choices}</div>
        );
    }
}