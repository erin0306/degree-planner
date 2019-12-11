import React, { Component } from 'react';
import firebase from 'firebase/app';

import { Header } from './Header.js'
import { Footer } from './Footer.js'

export class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = { plans: [] };
    }

    componentDidMount() {
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
        // TODO: test no plans 
        if (!this.state.plans) return (

            <div className="card panel">
                <p> No planned courses. Go to Courses to add new plans!</p>
            </div>
        );

        let planKeys = Object.keys(this.state.plans);
        console.log(planKeys);
        let planArr = planKeys.map((key) => {
            let planObj = this.state.plans[key];
            planObj.id = key;
            return planObj;
        })
        console.log(planArr);

        let data = planArr.map((course) => {
            return <RenderData key={course.id} course={course} />
        });

        return (
            <div id="main-element">
                <Header page={"Your Plan"}  signoutCallback={this.props.signoutCallback}/>
                <main>
                    <section id="course-results" className="schedule searchResult">
                        <h2>Planned Courses</h2>
                        {data}
                    </section>
                </main>
                <Footer />
            </div>
        );
    }
}

class RenderData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            output: "",
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.setState({ loading: 'hidden' });

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
        let course = this.props.course;
        let newPlan = {
            Department: this.props.course.Department,
            Code: this.props.course.Code,
            Name: this.props.course.Name,
            Campus: this.props.course["Campus"],
            AofK: this.props.course.AofK,
            Prereqs: this.props.course.Prereqs,
            Quarters: this.props.course.Quarters,
            Credits: this.props.course.Credits,
            planned: true,
        }
        let planRef = firebase.database().ref('plannedCourses').child(course.Department + course.Code);
        planRef.set(newPlan)

        if (course) {
            console.log('planned');
            planRef.set(null)
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }

    render() {
        let course = this.props.course;
        return (
            <div className="card">
                <div className="card panel">
                    <h3>{course.Department} {course.Code} {course.Name}</h3>
                    <span>Campus: </span>{course.Campus}<br></br>
                    <span>Credits: </span>{course.Credits}<br></br>
                    <span>Areas of Knowledge: </span>{course.AofK}<br></br>
                    <span>Prerequisites: </span>{course.Prereqs}<br></br>
                    <span>Quarter(s) Offered: </span>{course.Quarters}<br></br>

                    <span><button className="clickable added" onClick={this.addRemove}>Remove from Plan</button> </span> <br></br>
                </div>
            </div>
        );
    }
}