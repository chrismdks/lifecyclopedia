import React from "react";
import { getRandomUser } from "./Utility/api";
import Instructor from "./Components/Instructor";

class ClassPage extends React.Component{
    constructor(props){
        super(props);
        this.state = JSON.parse(localStorage.getItem("lifeCyclopediaState")) || {
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

        if (JSON.parse(localStorage.getItem("lifeCyclopediaState"))) {
            //this.setState(JSON.parse(localStorage.getItem("lifeCyclopediaState")));
        }
        else{
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
    }
    /**
     * Fetching data in componentDidMount() for instructor it will automatically invoke componentDidUpdate() method.
     * Everytime a component is updated, componentDidUpdate() is called
     */
    componentDidUpdate = async (previousProps, previousState) => {
        console.log("Component Did Update");
        localStorage.setItem("lifeCyclopediaState",JSON.stringify(this.state));
        console.log("Old State - " + previousState.studentCount);
        console.log("New State - " + this.state.studentCount);

        if (previousState.studentCount < this.state.studentCount) {
            // New Student added!
            const response = await getRandomUser();
            this.setState(prevState => {
                return {
                    studentList : [
                        ...prevState.studentList,{
                            name : response.data.first_name + " " + response.data.last_name
                        }
                    ]
                }
            });
        }
        else if (previousState.studentCount > this.state.studentCount) {
            // Remove All
            this.setState(prevState => {
                return {
                    studentList : []
                }
            });
        }
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

    handleToggleInstructor = () => {
        this.setState(prevState => {
            return {
                hideInstructor: !prevState.hideInstructor
            }
        });
    }

    render(){
        console.log("Render Component");
        return (
            <div>
                {this.state.instructor && <Instructor instructor={this.state.instructor} toggle={this.handleToggleInstructor} hideInstructor={this.state.hideInstructor}/>}
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

                    {this.state.studentList.map((student,index) => {
                        return (
                            <div className="text-white" key={index}>- {student.name}</div>
                        )
                    })}

                </div>

            </div>
        )
    }
}

export default ClassPage