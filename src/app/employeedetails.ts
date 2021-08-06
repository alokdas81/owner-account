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
export interface employee_under {
  emp_id: string;
  f_name: string;
  l_name: string;
  email: string;
  phone: number;
  status: string;
  sup_id: number;
  roll: number;
}

export interface Colleague {
  emp_id: string;
  f_name: string;
  l_name: string;
  email: string;
  phone: number;
  status: string;
  sup_id: number;
  roll: number;
}

export interface Supervisor extends Colleague {}
