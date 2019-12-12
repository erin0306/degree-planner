import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';
import firebase from 'firebase/app';

import { Header } from './Header.js';
import { Footer } from './Footer.js';
import MAJORS from './data/major.json';

export class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = { plans: [], completed: [], major : "Unknown" };
    }

    componentDidMount() {
        this.completedRef = firebase.database().ref('completedCourses');
        this.completedRef.on('value', (snapshot) => {
            let obj = snapshot.val();
            this.setState({ completed: obj }); 
        });
        this.plansRef = firebase.database().ref('plannedCourses');
        this.plansRef.on('value', (snapshot) => {
            let obj = snapshot.val();
            this.setState({ plans: obj });
        });

        this.majorRef = firebase.database().ref('major');
        this.majorRef.on('value', (snapshot) => {
            let obj = snapshot.val();
            this.setState({ major: obj });
        })
    }
    componentWillUnmount() {
        this.plansRef.off();
        this.completedRef.off();
        this.majorRef.off();
    }

    calcCredits() {
        let completedKeys = Object.keys(this.state.completed);
        let completedArr = completedKeys.map((key) => {
            let completedObj = this.state.completed[key];
            completedObj.id = key;
            return completedObj;
        })
        let allCreds = 0;
        let majorCreds = 0;
        for (let i = 0; i < completedArr.length; i++) {
            if (completedArr[i]['Credits'] != "") {
                allCreds += parseInt(completedArr[i]['Credits'], 10);
            }
        }
        let majorInfo = MAJORS.filter(allMajor => allMajor['major'] === this.state.major);
        
        let completedInMajor = [];
        for (let k = 0; k < completedArr.length; k++) {
            if (majorInfo[0] != undefined) {
                if (completedArr[k]['Department'] === majorInfo[0]['Abrev']) {
                    completedInMajor.push(completedArr[k]);
                }
            }
        }
        for (let j = 0; j < completedInMajor.length; j++) {
            if (completedInMajor[j]['Credits'] != "") {
                majorCreds += parseInt(completedInMajor[j]['Credits'], 10);
            }
        }
        return <div className="card">
                    <h3>{allCreds} credits</h3>
                    <p>{majorCreds} intended major credits</p>
                </div>
    }

    render() {
        // console.log(this.state.completed);
        let renderCredits = this.calcCredits();
        return (
            <div id="main-element">
                <Header page={"Dashboard"} signoutCallback={this.props.signoutCallback}/>
                <main>
            <div id="dashboard-page">
                <div className="flex-container">
                    <section className="subSection">
                        <div className="profile">
                            <h2>Student Profile</h2>
                            <div className="card">
                                <h3>{this.props.user['displayName']}</h3>
                                <p>Junior</p>
                                <p>ID: 9999999</p>
                            </div>
                        </div>
                        <div className="profile">
                            <h2>Intended Major</h2>
                            <div className="card">
                                <h3>{this.state.major}</h3>
                                <p>Custom Track</p>
                            </div>
                        </div>
                        <div className="profile">
                            <h2>Graduation Progress</h2>
                            {renderCredits}
                        </div>
                    </section>
                    
                    <RenderPlanned plans={this.state.plans}/>
                    <RenderCompleted completed={this.state.completed}/>
                </div>
                <section className="schedule">
                    <h2>Recommended Courses</h2>
                    <div className="clickable card">
                        <h3>INFO 340 Client-Side Development</h3>
                        <p>You have prereqs for this class: CSE 142 or CSE 143; and INFO 201</p>
                    </div>
                    <div className="clickable card">
                        <h3>EDUC 251 Seeking Educational Equity and Diversity</h3>
                        <p>Because you need DIV credits</p>
                    </div>
                    <div className="clickable card">
                        <h3>MKTG 301 Marketing Concepts</h3>
                        <p>You have prereqs for this class: ECON 200 <br></br>>
                            It is an eligible elective for your program</p>
                    </div>
                    <div className="clickable card">
                        <h3>INFO 350 Information Ethics And Policy</h3>
                        <p>It is a graduation requirement <br></br> Because you need W credits</p>
                    </div>
                </section>
            </div>
            </main>
                <Footer />
            </div>
        );
    }
}

class RenderPlanned extends Component {
    render() {
        // console.log(this.props.plans);
        if (this.props.plans === null) {
            return <section className="subSection">
                    <h2>Planned Courses</h2>
                    <div className="card">
                        <p><Link to='/findcourses'>Click here to add courses</Link></p>
                    </div>
                </section>
        }
        let planKeys = Object.keys(this.props.plans);
        // console.log(planKeys);
        let planArr = planKeys.map((key) => {
            let planObj = this.props.plans[key];
            planObj.id = key;
            return planObj;
        })
        // console.log(planArr);

        let data = planArr.map((course) => {
            return <div key={course.Department + course.Code} className="card">
                    <h3>{course['Department'] + ' ' + course['Code']}</h3>
                    <p>{course['Credits'] +  ' credits | ' + course['AofK']}</p>
                </div>
        });
        if (data.length > 5) {
            data = data.slice(0, 6);
        }
        return (
            <section className="subSection">
                    <h2>Planned Courses</h2>
                    {data}
                    <div className="card">
                        <p><Link to='/yourplan'>View All Planned Courses</Link></p>
                    </div>
                </section>
        )
    }
}
class RenderCompleted extends Component {
    render() {
        // console.log(this.props.completed);
        if (this.props.completed === null) {
            return <section className="subSection">
                    <h2>Completed Courses</h2>
                    <div className="card">
                        <p><Link to='/findcourses'>Click here to add courses</Link></p>
                    </div>
                </section>
        }
        let completedKeys = Object.keys(this.props.completed);
        // console.log(completedKeys);
        let completedArr = completedKeys.map((key) => {
            let completedObj = this.props.completed[key];
            completedObj.id = key;
            return completedObj;
        })
        // console.log(completedArr);

        let data = completedArr.map((course) => {
            return <div key={course.Department + course.Code} className="card">
                    <h3>{course['Department'] + ' ' + course['Code']}</h3>
                    <p>{course['Credits'] +  ' credits | ' + course['AofK']}</p>
                </div>
        });
        if (data.length > 5) {
            data = data.slice(0, 6);
        }
        return (
            <section className="subSection">
                    <h2>Completed Courses</h2>
                    {data}
                    <div className="card">
                        <p><Link to='/yourcompleted'>View All Completed Courses</Link></p>
                    </div>
                </section>
        )
    }
}

