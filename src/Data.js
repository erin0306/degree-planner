import React, { Component } from 'react';
import firebase from 'firebase/app';

export class ResultField extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayCourses: [],
            //   loading: '',
        }
    }

    componentDidMount() {
        //get planned courses from firebase as objects
        this.plansRef = firebase.database().ref('plannedCourses');
        this.plansRef.on('value', (snapshot) => {
            let obj = snapshot.val();
            this.setState({ plans: obj }); 
        })
    }
    componentWillUnmount() {
        this.plansRef.off();
    }

    render() {
        // let data = this.props.displayCourses.map((course) => {
        //     return <RenderData course={course} key={course.Department + course.Code}/>
        // });
        // console.log(this.props.loading);

        let data = this.props.displayCourses.map((course) => {
            return <RenderData course={course} plans={this.state.plans} loadingCallback={this.props.loadingCallback} key={course.Department + course.Code} />
        });
        let spinner = null;
        if (this.props.loading === 'hidden') {
            spinner = (
                null
            );
        } else {
            spinner = (
                <p>Loading data...</p>
            );
        }
        // console.log(spinner);
        return (
            <section id="course-results" className="schedule searchResult">
                <h2>Recommended Courses</h2>

                {/* <p className={this.state.loading}>Loading data...</p> */}
                {spinner}
                {data}
                {/* {result} */}
            </section>
        );
    }
}

class RenderData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            output: "",
            clicked: false,
        }
    }
    componentDidMount() {
        // this.setState({loading: 'hidden'});
        this.props.loadingCallback();
    }

    handleClick = () => {
        if (this.state.clicked == false) {
            this.setState({ clicked: true });
        } else {
            this.setState({ clicked: false });
        }

    }

    addRemove = (event) => {
        let course = this.props.course; 
        let newPlan = {
            Department: this.props.course.Department,
            Code: this.props.course.Code,
            Name: this.props.course.Name,
            Campus: this.props.course["Campus"],
            AofK: this.props.course['Areas of Knowledge'],
            Prereqs: this.props.course["Prerequisites"],
            Quarters: this.props.course.Offered,
            Credits: this.props.course.Credits,

        }

        // Insert new planned courses
        let planRef = firebase.database().ref('plannedCourses').child(course.Department + course.Code);
        planRef.set(newPlan)

        // planRef.on('value', (snapshot) => {
        //     let obj = snapshot.val();
        //     this.setState({ firebasePlan: obj });
        // })

        if (this.props.plans) { // if plans object retrieved from firebase is not empty
            if (this.props.plans[course.Department + course.Code]) { // if the course is in plannedCourses
                planRef.set(null) // Delete from database
                    .catch((error) => {
                        console.log(error.message);
                    });
            }
        }

    }

    render() {
        let popPanel = null;
        this.planned = false;
        if (this.props.plans) { // if there's anything in plannedCourses
            let planKeys = Object.keys(this.props.plans); // get list of course id
            if (planKeys.includes(this.props.course.Department + this.props.course.Code)) { // if this course matches any in plannedCourses
                this.planned = true; 
            }

        }
        if (this.state.clicked) {
        popPanel = (
            <div className="card panel">
                <span>Campus: </span>{this.props.course["Campus"]}<br></br>
                <span>Credits: </span>{this.props.course["Credits"]}<br></br>
                <span>Areas of Knowledge: </span>{this.props.course["Areas of Knowledge"]}<br></br>
                <span>Prerequisites: </span>{this.props.course["Prerequisites"]}<br></br>
                <span>Quarter(s) Offered: </span>{this.props.course.Offered}<br></br>
                <span><button className={"clickable " + (this.planned ? 'added' : '')} onClick={this.addRemove}>{(this.planned ? 'Remove from Plan' : 'Add to Plan')}</button> </span> <br></br>
            </div>
        );
        } 

        return (
            <div>
            <div className="clickable card" onClick={this.handleClick}>
                <h3>{this.props.course.Department} {this.props.course.Code} {this.props.course.Name}</h3>
                <p>Because you searched for {this.props.course.Department}</p>
                
            </div>
                {popPanel}
            </div>
        );
    }
}
