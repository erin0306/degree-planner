import React, {Component} from 'react';

export class ResultField extends Component {
    render() {
        let data = this.props.displayCourses.map((course) => {
            return <RenderData course={course} key={course.Department + course.Code}/>
        });
        return (
            <section id="course-results" className="schedule searchResult">
                <h2>Recommended Courses</h2>
                <p className={this.props.isLoading}>Loading data...</p>
                {data}
            </section>
        );
    }
}

class RenderData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            output : ""
        }
    }

    handleClick = () => {
        let panel = this.popPanel();
        this.setState({output : panel});
    }

    popPanel() {
        if (this.state.output !== "") {
            return "";
        }
        let offered = this.props.Offered;
        if (this.props.course.Offered === "A,W,Sp,S" || this.props.Offered === undefined) {
            offered = "All";
        }
        return <div className="card panel">
                <b>Campus: </b>{this.props.course["Campus"]}<br></br> 
                <b>Credits: </b>{this.props.course["Credits"]}<br></br>
                <b>Areas of Knowledge: </b>{this.props.course["Areas of Knowledge"]}<br></br>
                <b>Prerequisites: </b>{this.props.course["Prerequisites"]}<br></br>
                <b>Quarter(s) Offered: </b>{offered}<br></br>
                <button class="clickable">Add to Plan</button>
            </div>
    }

    render() {
        return (
            <div className="clickable card" onClick={this.handleClick}>
                <h3>{this.props.course.Department} {this.props.course.Code} {this.props.course.Name}</h3>
                <p>Because you searched for {this.props.course.Department}</p>
                {this.state.output}
            </div>
        );
    }
}