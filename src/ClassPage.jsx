import React from "react";
import { getRandomUser } from "./Utility/api";

class ClassPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            instructor: undefined,
            studentList: [],
            studentCount: 0,
            hideInstructor: false,
            inputName: "",
            inputFeedback: ""
        };
    }

    // 3 critical lifecycle methods for class-based components:
    
    /** componentDidMount(): 
     * the best place to load some data to my initial state is through this method (in a class-based component).
     * It is invoked immediately after a component is mounted.
    */
    componentDidMount = async() => {
        console.log("Component Did Mount");
        const response = await getRandomUser(); //getRandomUser() is an async method so we have to await.
        console.log(response);
        this.setState(prevState => {
            return {
                instructor: {
                    name: response.data.first_name + " " + response.data.last_name,
                    email: response.data.email,
                    phone: response.data.phone_number
                }
            }
        });
    }
    /**
     * Fetching data in componentDidMount() for instructor it will automatically invoke componentDidUpdate() method.
     * Everytime a component is updated, componentDidUpdate() is called
     */
    componentDidUpdate(){
        console.log("Component Did Update");
    }

    componentWillUnmount(){
        console.log("Component Will Unmount");
    }

    handleAddStudent = () => {
        this.setState(prevState => {
            return {
                studentCount: prevState.studentCount + 1
            }
        });
    }

    handleRemoveAllStudents = () => {
        this.setState(prevState => {
            return {
                studentCount: 0
            }
        });
    }

    render(){
        console.log("Render Component");
        return (
            <div>
                {this.state.instructor && (
                    <div className="p-3">
                        <span className="h4 text-success">Instructor</span>
                        &nbsp;
                        <i className="bi bi-toggle-off btn btn-success btn-sm mb-2 p-1"></i>
                        <br/>
                        Name: {this.state.instructor.name}
                        <br/>
                        Email: {this.state.instructor.email}
                        <br/>
                        Phone: {this.state.instructor.phone}
                    </div>
                )}
                <div className="p-3">
                    <span className="h4 text-success">Feedback</span>
                    <br/>
                    <input type="text" 
                    placeholder="Name..."
                    value={this.state.inputName}
                    onChange={e => {
                        this.setState({inputName:e.target.value})
                    }}
                    ></input>
                    &nbsp;
                    Value: {this.state.inputName}
                    <br/>
                    <textarea placeholder="Feedback..." 
                    value={this.state.inputFeedback} 
                    onChange={e => {
                        this.setState({inputFeedback:e.target.value})
                    }}
                    ></textarea>
                    &nbsp;
                    Value: {this.state.inputFeedback}
                </div>
                <div className="p-3">
                    <span className="h4 text-success">Students</span>
                    <br/>
                    <div>Student Count: {this.state.studentCount}</div>
                    <button className="btn btn-success btn-sm" onClick={this.handleAddStudent}>Add Student</button>
                    &nbsp;
                    <button className="btn btn-danger btn-sm" onClick={this.handleRemoveAllStudents}>Remove All Students</button>
                </div>

            </div>
        )
    }
}

export default ClassPage