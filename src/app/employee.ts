export interface Employee {
	employeeId?: string;
	firstName: string;
	lastName: string;
	email: string;
	department: Department;
}

export interface Department {
	departmentName: string;
	departmentCode: string;
}
