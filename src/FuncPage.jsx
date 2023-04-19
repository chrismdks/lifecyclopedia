import React, { useState, useEffect, useRef } from "react";
import { getRandomUser } from "./Utility/api";
import InstructorFunc from "./Components/InstructorFunc";

const FuncPage = () => {
    
    /** USE STATE - start **/
    const [instructorState,setInstructorState] = useState(() => {
        return {
            instructor:  JSON.parse(localStorage.getItem("InstructorState"))?.instructor,
            hideInstructor: false
        }
    })
    const [studentState,setStudentState] = useState(() => {
        return {
            studentList: JSON.parse(localStorage.getItem("StudentList")) || [],
            studentCount: JSON.parse(localStorage.getItem("StudentCount")) || 0
        }
    })
    const [inputName,setInputName] = useState(() => {
        return "";
    })
    const [inputFeedback,setInputFeedback] = useState(() => {
        return "";
    })
    /** USE STATE - end **/

    const getInstructor = async() => {
        const response = await getRandomUser(); //getRandomUser() is an async method so we have to await.
        setInstructorState(prevState => {
            return {
                ...prevState,
                instructor: {
                    name: response.data.first_name + " " + response.data.last_name,
                    email: response.data.email,
                    phone: response.data.phone_number,
                }
            }
        });
    }
    const getStudent = async() => {
        const response = await getRandomUser(); //getRandomUser() is an async method so we have to await.
        setStudentState(prevState => {
            return {
                studentCount: prevState.studentList.length + 1,
                studentList : [
                    ...prevState.studentList, {
                        name: response.data.first_name + " " + response.data.last_name
                    }
                ]
            }
        });
    }

    /* This will be called on initial/first render (ComponentDidMount) */
    useEffect(() => {
        if (!instructorState.instructor) {
            getInstructor();
        }
    }, [])

    /* This will be called everytime value of attribute(s) in the [] changes (ComponentDidUpdate) */
    useEffect(() => {
        localStorage.setItem("InstructorState",JSON.stringify(instructorState));
    },[instructorState])

    /* This will be called everytime value of attribute(s) in the [] changes (ComponentDidUpdate) */
    useEffect(() => {
        localStorage.setItem("StudentList",JSON.stringify(studentState.studentList));
        localStorage.setItem("StudentCount",JSON.stringify(studentState.studentCount));
    },[studentState.studentList])


    const handleRemoveAllStudents = () => {
        setStudentState(prevState => {
            return {
                studentList: [],
                studentCount: 0
            }
        });
    }

    const handleToggleInstructor = () => {
        setInstructorState(prevState => {
            return {
                ...prevState,
                hideInstructor: !prevState.hideInstructor
            }
        });
    }

    return (
        <div>
            <div className="p-3">
                <span className="h4 text-success">Instructor</span>
                &nbsp;
                <i className= {
                    `bi 
                    ${instructorState.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"} 
                    btn btn-success btn-sm mb-2 p-1`} 
                    onClick = {handleToggleInstructor}
                ></i>
                {!instructorState.hideInstructor && instructorState.instructor && 
                    <InstructorFunc instructor = {instructorState.instructor} />}
            </div>
            <div className="p-3">
                <span className="h4 text-success">Feedback</span>
                <br/>
                <input type="text" 
                placeholder="Name..."
                value={inputName}
                onChange={e => {
                    setInputName(e.target.value)
                }}
                ></input>
                &nbsp;
                Value: {inputName}
                <br/>
                <textarea placeholder="Feedback..." 
                value={inputFeedback} 
                onChange={e => {
                    setInputFeedback(e.target.value)
                }}
                ></textarea>
                &nbsp;
                Value: {inputFeedback}
            </div>
            <div className="p-3">
                <span className="h4 text-success">Students</span>
                <br/>
                <div>Student Count: {studentState.studentCount}</div>
                <button className="btn btn-success btn-sm" onClick={getStudent}>Add Student</button>
                &nbsp;
                <button className="btn btn-danger btn-sm" onClick={handleRemoveAllStudents}>Remove All Students</button>
                {studentState.studentList.map((student,index) => {
                    return (
                        <div className="text-white" key={index}>- {student.name}</div>
                    )
                })}
            </div>
        </div>
    )
}
export default FuncPage