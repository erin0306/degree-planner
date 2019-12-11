import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';
import firebase from 'firebase/app';


export class DashboardPage extends Component {
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
        return (
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
                                <h3>Informatics</h3>
                                <p>HCI Track</p>
                            </div>
                        </div>
                        <div className="profile">
                            <h2>Graduation Progress</h2>
                            <div className="card">
                                <h3>100 credits</h3>
                                <p>40 intended major credits</p>
                            </div>
                        </div>
                    </section>
                    <RenderData plans={this.state.plans}/>
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
        );
    }
}

class RenderData extends Component {
    render() {
        if (this.props.plans === null) {
            return <section className="subSection">
                    <h2>Planned Courses</h2>
                    <div className="card">
                        <p><Link to='/findcourses'>Click here to add courses</Link></p>
                    </div>
                </section>
        }
        let planKeys = Object.keys(this.props.plans);
        console.log(planKeys);
        let planArr = planKeys.map((key) => {
            let planObj = this.props.plans[key];
            planObj.id = key;
            return planObj;
        })
        console.log(planArr);

        let data = planArr.map((course) => {
            return <div key={course.Department + course.Code} className="card">
                    <h3>{course['Department'] + ' ' + course['Code']}</h3>
                    <p>{course['Credits'] +  ' credits | ' + course['AofK']}</p>
                </div>
        });
        if (data.length > 5) {
            data = data.slice(0, 6);
        }
        return <section className="subSection">
                    <h2>Planned Courses</h2>
                    {data}
                    <div className="card">
                        <p><Link to='/yourplan'>View All Planned Courses</Link></p>
                    </div>
                </section>
    }
}