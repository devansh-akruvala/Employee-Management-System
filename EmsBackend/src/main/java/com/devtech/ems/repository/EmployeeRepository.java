package com.devtech.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devtech.ems.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
