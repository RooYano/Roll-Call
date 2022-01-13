import React, {useState, useEffect} from 'react';
import axios from 'axios';
import StudentForm from './StudentForm';

const CreateStudent = () => {
    const [formValues, setFormValues] =
        useState({ name: '', email:'', rollno: ''})

    const onSubmit = studentObject => {
        axios.post(
            'http://localhost:3000/students/create-student',
                studentObject)
                    .then(res =>  {
                        if (res.status === 200) {
                            alert('Student successfully created')
                        }
                        else {
                            Promise.reject();
                        }
                    })
                    .catch(err=> alert('Something went wrong'))
    }

    useEffect(() => {
        axios   
            .get(
                    'http://localhost:3000/students/update-student/'
                    + props.match.params.id
                    
            )
            .then((res)=> {
                const { name, email, rollno } = res.data;
                setFormValues({ name, email, rollno});
            })
            .catch((err) => console.log(err));
    },[]);

    return(
        <StudentForm initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize>
                CreateStudent
        </StudentForm>
    )
}

export default CreateStudent