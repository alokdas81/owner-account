import { ShowHidePasswordModule } from 'ngx-show-hide-password';

export interface Detail {
  status: string;
  roll: number;
}
export interface Employee {
  emp_id: string;
  f_name: string;
  l_name: string;
  phone: number;
  email: string;
  password: string;
  sup_id: number;
  supervisor_name: string;
  role: number;
  status: number;

  details?: Detail[];
}


export interface EmployeeForAdd {
  f_name: string;
  l_name: string;
  phone: number;
  email: string;
  role: number;
  password: string;
  sup_id: number;
}

export interface AuthResponce {
  email: string;
  password: string;
  role: number;
  sup_id: number;
  token: string;
}

export interface EmpResponce {
  emp_email: string;
  emp_password: string;
  token: string;
}

export interface LogInResponce {
  email: string;
  password: string;
  role: number;
  token: string;
}

export interface Kpi {
  sup_id: number;
  feedback_emp_id: number;
  availability: number;
  ontime: number;
  punctuality: number;
  regularity: number;
  timetorepair: number;
  criticalproblemsolving: number;
  clienthandling: number;
  innovative: number;
  teamPlayer: number;
  dependibility: number;
}
export interface SupGivenKpi extends Kpi{
  Feedback_given_employee_name: string
}

export interface EmpGivenKpi extends Kpi{
  feedback_given_emp_name: string
}

export interface Addkpi extends Kpi {
  emp_id: string;
}

export interface employee_under {
  emp_id: string;
  f_name: string;
  l_name: string;
  email: string;
  phone: number;
  status: string;
  sup_id: number;
  roll: number;
  feedback_emp_id:number;

}


export interface Self extends employee_under{

}
export interface Colleague {
  emp_id: string;
  f_name: string;
  l_name: string;
  email: string;
  phone: number;
  password:string;
  status: string;
  sup_id: string;
  role: number;
}

export interface Supervisor extends Colleague {
  supervisor_name:string
}

export interface Avg extends Colleague{
  average:number
}
