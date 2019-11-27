import React, {Component} from 'react';
import * as d3 from 'd3';
import data from './data/uwcourses.csv';

export class ResultField extends Component {
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
        console.log(this.state.isLoading);
        return (
            <section id="course-results" className="schedule searchResult">
                <h2>Recommended Courses</h2>
                <p className={this.state.isLoading}>Loading data...</p>
            </section>
        );
    }
}