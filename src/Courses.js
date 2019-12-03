import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


//Import Local Files and Components
import {ResultField} from './Data.js';
import FILTERS from './filter.json';

export class CoursePage extends Component {
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
        this.setState(nameValueObj);
    }

    updateInput = (newInput) => {
        this.setState(newInput);
    }

    resetFilter  = (event) => {
        let currentInput = this.state.input;
        this.setState({input: currentInput, prereq: "", AofK: "", quarter: "",  campus: "" });
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