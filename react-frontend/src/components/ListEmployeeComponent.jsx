import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'
const ListEmployeeComponent = () => {

const [employees, setEmployees] = useState([])


useEffect(() => {
 getAllEmployees();
}, [])

const getAllEmployees=()=>{
    EmployeeService.getEmployees().then((res)=>{
        setEmployees(res.data);
     }).catch(error=>{console.error(error)})
    
}

const deleteEmployee =(employeeId)=>{
    EmployeeService.deleteEmployee(employeeId).then(()=>{
        getAllEmployees()
    }).catch(error=>console.log(error));
}

  return (
    <div className='container'>
        <h2 className='text-center'>List Employees</h2>
        <div><Link to='/add-employee' className='btn btn-primary mb-2'>Add Employee</Link></div>
        
        <table className='table table-bordered table-stripped'>
            <thead>
                <tr>
                <th>Employee Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(
                        employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.emailId}</td>
                            <td> <Link to={`/edit-employee/${employee.id}`} className="btn btn-info"> Update</Link>
                            <button className='btn btn-danger' onClick={()=>deleteEmployee(employee.id)} style={{marginLeft:"10px"}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>

    </div>
  )
}

export default ListEmployeeComponent