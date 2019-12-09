import React, { Component } from 'react';
import firebase from 'firebase/app';

export class Plan extends Component {

    render() {

        // use allcourses as mock bookmark data
        let plannedCourses = this.props.allCourses.slice(0, 5);
        console.log(plannedCourses);
        let data = plannedCourses.map((course) => {
            return <RenderData user={this.props.user} course={course} key={course.Department + course.Code} />
        });

        return (
            <section id="course-results" className="schedule searchResult">
                <h2>Planned Courses</h2>

                {/* <p className={this.state.loading}>Loading data...</p> */}
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
    
    // Using planned courses to test firebase add/remove because the button is always there
    addRemove = (event) => {
        event.preventDefault(); //don't submit
        let course = this.props.course;
        let newPlan = {
            // Department:  this.props.course.Department,
            // Code: this.props.course.Code,
            // Name: this.props.Name,
            test: 'test',
        }
        let planRef = firebase.database().ref('plannedCourses').child(course.Department+course.Code);
        // console.log(chirpRef);
        planRef.set(newPlan)
        // this.setState({post:''}); //empty out post for next time
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
                    
                    {/* delete later, use for testing firebase adding */}
                    <span><button className={"clickable " + (this.state.added ? 'added' : '')} onClick={this.addRemove}>{(this.state.added ? 'Remove from Plan' : 'Add to Plan')}</button> </span> <br></br>

                    {/* actual line commented out for testing*/}
                    {/* <span><button className={"clickable " + (this.state.added ? 'added' : '')} onClick={this.removePlan}>{(this.state.added ? 'Remove from Plan' : 'Add to Plan')}</button> </span> <br></br> */}
                </div>
            </div>
        );
    }
}