import React from "react";
import { getRandomUser } from "./Utility/api";

class ClassPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            instructor: undefined,
            studentList: [],
            studentCount: 0,
            hideInstructor: false
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

    componentDidUpdate(){
        console.log("Component Did Update");
    }

    componentWillUnmount(){
        console.log("Component Will Unmount");
    }

    render(){
        console.log("Render Component");
        return (
            <div>
                {this.state.instructor && (
                    <div className="p-3">
                        <span className="h4 text-success">Instructor</span>
                        <i className="bi bi-toggle-off btn btn-success btn-sm mb-1"></i>
                        <br/>
                        Name: {this.state.instructor.name}
                        <br/>
                        Email: {this.state.instructor.email}
                        <br/>
                        Phone: {this.state.instructor.phone}
                    </div>
                )}
            </div>
        )
    }
}

export default ClassPage