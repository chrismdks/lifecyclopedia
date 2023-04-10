import React from "react";

class Instructor extends React.Component {

    render() {
        return (
            <div className="p-3">
                <span className="h4 text-success">Instructor</span>
                &nbsp;
                <i className="bi bi-toggle-off btn btn-success btn-sm mb-2 p-1"></i>
                <br/>
                Name: {this.props.instructor.name}
                <br/>
                Email: {this.props.instructor.email}
                <br/>
                Phone: {this.props.instructor.phone}
            </div>
        )
    }
}

export default Instructor;