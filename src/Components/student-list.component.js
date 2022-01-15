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
                setStudents([data]) ;
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const DataTable = (students) => {
        
        console.log(JSON.stringify(students));
        return students.map((res, i) => {
            return <StudentTableRow obj={res} key={i} />
        });
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
                <tbody>{DataTable(students)}</tbody>
            </Table>
        </div>
    );
};

export default StudentList;