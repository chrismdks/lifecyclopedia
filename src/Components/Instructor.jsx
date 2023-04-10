import React from "react";

class Instructor extends React.Component {

    componentDidMount() {
        console.log("Mounted - Instructor");
    }
    componentDidUpdate() {
        console.log("Update - Instructor");
    }
    componentWillUnmount() {
        console.log("UnMount - Instructor");
    }
    
    render() {
        console.log("Render - Instructor");
        return (
            <div className="p-3">
                <span className="h4 text-success">Instructor</span>
                &nbsp;
                <i className={`bi ${this.props.hideInstructor?"bi-toggle-off":"bi-toggle-on"} btn btn-success btn-sm mb-2 p-1`} onClick={this.props.toggle}></i>
                {!this.props.hideInstructor && 
                <div>
                    Name: {this.props.instructor.name}
                    <br/>
                    Email: {this.props.instructor.email}
                    <br/>
                    Phone: {this.props.instructor.phone}
                </div>}
            </div>
        )
    }
}

export default Instructor;