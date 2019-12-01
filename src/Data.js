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
        let offered = this.props.course.Offered;
        // if (this.props.course.Offered === "A,W,Sp,S" || this.props.Offered === undefined) {
        //     offered = "All";
        // }
        return <div className="card panel">
                <span>Campus: </span>{this.props.course["Campus"]}<br></br> 
                <span>Credits: </span>{this.props.course["Credits"]}<br></br>
                <span>Areas of Knowledge: </span>{this.props.course["Areas of Knowledge"]}<br></br>
                <span>Prerequisites: </span>{this.props.course["Prerequisites"]}<br></br>
                <span>Quarter(s) Offered: </span>{offered}<br></br>
                <button className="clickable">Add to Plan</button>
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