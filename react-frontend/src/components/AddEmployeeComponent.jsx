import React, {useState,useEffect} from 'react'
import {useNavigate,Link,useParams} from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const AddEmployeeComponent = () => {

const [firstName, setfirstName] = useState("")
const [lastName, setlastName] = useState("")
const [emailId, setemailId] = useState("")
const navigate = useNavigate();
const {id} = useParams();


const saveorUpdateEmployee = (e) =>{
    e.preventDefault();

    const employee={firstName,lastName,emailId}
    navigate("/employees")
    if(id){
        EmployeeService.updateEmployee(id,employee).then((res)=>{
            navigate('/employees')
        }).catch(error=>{console.log(error)})
    }
    else{
        EmployeeService.addEmployee(employee).then( (res)=>{
            navigate('/employees')
        }).catch(error=>console.error(error))
    }
}


useEffect(() => {
if(id){
    EmployeeService.getEmployeeById(id).then((res)=>{
        setfirstName(res.data.firstName)
        setlastName(res.data.lastName)
        setemailId(res.data.emailId)
     }).catch(error => console.log(error))
    
}

}, [id])

const title =()=>{
    if(id)
    return <h2 className='text-center'> Update Employee</h2>
    else
    return <h2 className='text-center'> Add Employee</h2>
}

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                   {title()} 
                    <div className='class-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label children="form-label">
                                    First Name:
                                </label>
                                    <input type="text" 
                                    name='firstName'
                                    className='form-control'
                                    value={firstName}
                                    onChange = {(e) =>setfirstName(e.target.value)}
                                    />
                            </div>

                            <div className='form-group mb-2'>
                                <label children="form-label">
                                    Last Name:
                                </label>
                                    <input type="text" 
                                    name='lastName'
                                    className='form-control'
                                    value={lastName}
                                    onChange = {(e) =>setlastName(e.target.value)}
                                    />
                            </div>

                            <div className='form-group mb-2'>
                                <label children="form-label">
                                    Email:
                                </label>
                                    <input type="text" 
                                    name='emailId'
                                    className='form-control'
                                    value={emailId}
                                    onChange = {(e) =>setemailId(e.target.value)}
                                    />
                            </div>
                            <br /><br />
                            <button className='btn btn-primary' onClick={(e)=>saveorUpdateEmployee(e)}>Save</button>
                            <Link to='/employees' className='btn btn-danger'>Cancle</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEmployeeComponent