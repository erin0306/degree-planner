import React, {Component} from 'react';

export class ResultField extends Component {
    render() {
        // console.log(this.props.isLoading);
        return (
            <section id="course-results" className="schedule searchResult">
                <h2>Recommended Courses</h2>
                <p className={this.props.isLoading}>Loading data...</p>
                <RenderData courses={this.props.displayCourses}/>
            </section>
        );
    }
}

class RenderData extends Component {
    render() {
        let data = this.props.courses.map(course => {
            let uniqueKey = course.Department + course.Code;
            return (
                <div className="clickable card" key={uniqueKey}>
                    <h3>{course.Department} {course.Code} {course.Name}</h3>
                    <p>Because you searched for {course.Department}</p>
                </div>
            );
        });
        return data;
    }
}