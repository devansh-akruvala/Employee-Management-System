package com.devtech.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devtech.ems.exception.ResourceNotFoundException;
import com.devtech.ems.model.Employee;
import com.devtech.ems.repository.EmployeeRepository;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {
	@Autowired
	private EmployeeRepository employeeRepository;
	
	// get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	}
	
	// create employee
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}
	
	// get employee by his id
	
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable long id){
		Employee employee = employeeRepository.findById(id).orElseThrow(() -> 
		new ResourceNotFoundException("employee not found"));
		
		return ResponseEntity.ok(employee);
	}

	// update employee
	
	@PutMapping("employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable long id,@RequestBody Employee employee) {
		Employee updateEmployee = employeeRepository.findById(id).orElseThrow(() -> 
		new ResourceNotFoundException("employee not found"));
		System.out.println(employee);
		
		updateEmployee.setFirstName(employee.getFirstName());
		updateEmployee.setLastName(employee.getLastName());
		updateEmployee.setEmailId(employee.getEmailId());
		employeeRepository.save(updateEmployee);
		
		return ResponseEntity.ok(updateEmployee);
		
	}
	
	
	// delete employee
	@DeleteMapping("employees/{id}")
	public ResponseEntity<Employee> deleteEmployee(@PathVariable long id){
		Employee employee = employeeRepository.findById(id).orElseThrow(()->new 
				ResourceNotFoundException("Employee not found"));
		
		employeeRepository.delete(employee);
		return  new ResponseEntity<Employee>(HttpStatus.NO_CONTENT);
	}
	
}
