import React, { Component } from 'react';

export class Plan extends Component {

    render() {

        // use allcourses as mock bookmark data
        let plannedCourses = this.props.allCourses.slice(0, 5);
        console.log(plannedCourses);
        let data = plannedCourses.map((course) => {
            return <RenderData course={course} key={course.Department + course.Code} />
        });
        let spinner = null;
        // if (this.props.loading === 'hidden') {
        //     spinner = (
        //         null
        //     );
        // } else {
            // spinner = (
            //     <p>Loading data...</p>   
            // );
        // }
        console.log(spinner);
        return (
            <section id="course-results" className="schedule searchResult">
                <h2>Planned Courses</h2>

                {/* <p className={this.state.loading}>Loading data...</p> */}
                {spinner}
                {data}
            </section>
        );
    }
}

class RenderData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            output: "",
            added: false,
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.setState({loading: 'hidden'});

    }

    removePlan = () => {
        if (this.state.added) {
            this.setState({ added: false });
        } else {
            this.setState({ added: true });
        }
    }

    render() {
        console.log(this.state.added);
        return (
            <div className="card">
                <div className="card panel">
                    <h3>{this.props.course.Department} {this.props.course.Code} {this.props.course.Name}</h3>
                    <span>Campus: </span>{this.props.course["Campus"]}<br></br>
                    <span>Credits: </span>{this.props.course["Credits"]}<br></br>
                    <span>Areas of Knowledge: </span>{this.props.course["Areas of Knowledge"]}<br></br>
                    <span>Prerequisites: </span>{this.props.course["Prerequisites"]}<br></br>
                    <span>Quarter(s) Offered: </span>{this.props.course.Offered}<br></br>
                    <span><button className={"clickable " + (this.state.added ? 'added' : '')} onClick={this.removePlan}>{(this.state.added ? 'Remove from Plan' : 'Add to Plan')}</button> </span> <br></br>
                </div>
            </div>
        );
    }
}