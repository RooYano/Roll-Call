import React, {useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './StudentForm';

const EditStudent = (props) => {
    const [formValues, setFormValues] = useState({
        name:'',
        email:'',
        rollno:'',
    });
    
    let parsedID = window.location.href.split('http://localhost:3001/edit-student/')

    console.log(parsedID[1])


    const onSubmit = (studentObject) => {
        axios
            .put(
                'http://localhost:3000/students/update-student/' +
                    parsedID[1],
                studentObject
            )
            .then((res) => {
                if(res.status===200) {
                    alert('student successfully updated');
                    // props.history.push('/student-list');
                } else Promise.reject();
            })
            .catch((err) => console.log(err));
    };

    
    useEffect(() => {
        axios
            .get(
                'http://localhost:3000/students/update-student/'
                + parsedID[1]
            )
            .then((res) => {
                const {name, email, rollno} = res.data;
                setFormValues({ name, email, rollno });
            })
            .catch((err) => console.log(err));

    }, []);

    return (
        <StudentForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            updateStudent
        </StudentForm>
    );

};

export default EditStudent;