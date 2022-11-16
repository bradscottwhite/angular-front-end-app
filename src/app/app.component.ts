import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee, Department } from './employee';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-todo-app';
  
  private readonly ROOT_URL = 'http://springawsdemo2-env.eba-gpepswai.us-east-1.elasticbeanstalk.com/employee/'

  employees: Observable<Employee[]>;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  departmentName: string = '';
  departmentCode: string = '';

  constructor(private http: HttpClient) {
	this.employees = this.getEmployees();
  }

  private getEmployees(): Observable<Employee[]> {
	return this.http.get<Employee[]>(this.ROOT_URL + 's/');
  }

  /*getEmployee(id: string) {
	return this.http.get<Employee>(this.ROOT_URL + id);
  }*/

  addEmployee(data: Employee) {
		this.http.post<Employee>(this.ROOT_URL, data, httpOptions)
			.toPromise()
			   .then(res => {
				   // Change this to `push` to existing list!!!:
				   this.employees = this.getEmployees();
				   //this.employees = [ ...this.employees, res ]
				   console.log('New employee added')
			   })
			   .catch(() => { console.log('error'); });
  }

  add() {
	this.addEmployee({
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		department: {
			departmentName: this.departmentName,
			departmentCode: this.departmentCode
		}
	});

	this.firstName = ''
	this.lastName = ''
	this.email = ''
	this.departmentName = ''
	this.departmentCode = ''
  }


}

  /*
   *
export const addEmployee = async data => {
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
	console.log('New employee added')
	return await res.json()
  * */
	//const url: string = 'http://springawsdemo2-env.eba-gpepswai.us-east-1.elasticbeanstalk.com/employee/'

	// Add try/catch!!!

/*export const getEmployees = async () => {
	const res: Promise<Response> = await fetch(url + 's/')
	return await res.json()
}

export const getEmployee = async id => {
	const res = await fetch(url + id)
	return await res.json()
}

export const addEmployee = async data => {
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
	console.log('New employee added')
	return await res.json()
}

export const updateEmployee = async data => {
	fetch(url + data.employeeId, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
	console.log(`Updated employee ${data.employeeId}`)
}

export const deleteEmployee = async id => {
	await fetch(url + id, { method: 'DELETE' })
	console.log(`Deleted employee ${id}`)
};*/
