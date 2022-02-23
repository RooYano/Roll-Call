import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import StudentTableRow from './StudentTableRow';


const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3000/students/')
            .then(({data}) => {
                setStudents([data]);
            })
            .catch((error) => {
                console.log(error);
            });
    },[]);

    const DataTable = () => {
        console.log('log ' + students.length);
        if (students.length == 0) {
            return;
        } 
        return (
               students[0].map((res, i) => (<StudentTableRow obj={res} key ={i} />)
        ));
    };
  

    return (
        <div className='table-wrapper'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>Email</th>
                        <th>Roll No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    );
};

export default StudentList;