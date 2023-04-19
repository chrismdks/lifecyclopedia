import { useEffect } from "react";

const InstructorFunc = (props) => {

    // useEffect with a return statement : ComponentDidUnmount
    // a component will be unmounted when removed from the UI
    useEffect(() => {
        //console.log("This console.log will be called on initial/first render");
        return () => {
           console.log("Instructor - UNMOUNTED");
        };
    }, []);

    return (
        <div>
            Name: {props.instructor.name}
            <br/>
            Email: {props.instructor.email}
            <br/>
            Phone: {props.instructor.phone}
        </div>
    );
}
export default InstructorFunc;