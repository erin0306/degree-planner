import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
            loading: 'hidden',
        }
    }

    updateLoading = () => {
        this.setState({ loading: 'hidden' });
        console.log('updateLoading');
    }

    updateDisplay = (input, AofK, quarter, campus) => {
        this.setState({ loading: '' });
        console.log("loading: ''");
        let result = this.props.allCourses.filter(course => course["Department"].includes(input));
        result = result.filter(course => course["Areas of Knowledge"].includes(AofK));
        result = result.filter(course => course["Offered"].includes(quarter));
        result = result.filter(course => course["Campus"].includes(campus));

        this.setState({ displayCourses: result });
    }

    render() {
        return (
            <div id="main-element">
                <Header page={"Courses"} />
                <main>
                    <div id="course-page">
                        <SearchField allCourses={this.props.allCourses} updateDisplayCallback={this.updateDisplay} inputCallback={this.updateInput} />
                        <ResultField loading={this.state.loading} loadingCallback={this.updateLoading} displayCourses={this.state.displayCourses} />
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
            prereq: "",
            AofK: "",
            quarter: "",
            campus: "",
        }
    }

    updateForm = (nameValueObj) => {
        this.setState(nameValueObj, () => {
            // plz don't delete this callback Tim wants filters applied directly
            this.props.updateDisplayCallback(this.state.input, this.state.AofK, this.state.quarter, this.state.campus);
        });
    }

    updateInput = (newInput) => {
        this.setState(newInput);
    }

    resetFilter = (event) => {
        let currentInput = this.state.input;
        this.setState({ input: currentInput, prereq: "", AofK: "", quarter: "", campus: "" });
    }

    handleClick = (event) => {
        // let filteredData = this.searchCourse();
        // this.props.updateDisplayCallback({displayCourses : filteredData});
        this.props.updateDisplayCallback(this.state.input, this.state.AofK, this.state.quarter, this.state.campus);
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
    render() {
        let filterList = this.props.filters.map((element, i) => {
            return (
                <FilterCard key={i} filter={element} formCallback={this.props.formCallback} />
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
        let choices = this.props.filter.element.map((choice) => {
            return (
                <p key={choice.value}><input type={filter.type} name={filter.name} value={choice.value} onChange={this.handleChange}></input>{choice.content}<br></br></p>
            );
        });

        return (
            <div className="card"><h3>{filter.header}</h3>{choices}</div>
        );
    }
}