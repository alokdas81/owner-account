import { EmployeeDeleteService } from '../../service/employee-delete.service';
import { Admin } from './../admin.module';
import { RepositoryService } from './../../service/repo.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { Employee } from 'src/app/employeedetails';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  public displayedColumns = [
    'status',
    'emp_id',
    'f_name',
    'l_name',
    'email',
    'phone',
    'sup_id',
    'average',
    'details',
    'Superkpidetails',
    'Employeekpidetails',
    'update',
    'delete',
  ];
  public dataSource = new MatTableDataSource<Admin>();
  public employee!: Employee;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  _admin_name = JSON.parse(localStorage.getItem('data') as string);
  admin_name = this._admin_name.f_name;

  constructor(
    private repoService: RepositoryService,
    private router: Router,
    private location: Location,
    private employeeDelete: EmployeeDeleteService
  ) {}
  // @ViewChild("box") box:ElementRef | undefined

  ngOnInit() {
    this.getAllEmployees();
  }

  public getAllEmployees = () => {
    this.repoService.getData('list/').subscribe((res) => {
      console.warn(res);
      (this.dataSource.data = res as Admin[]),
        (err: { status: string }) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == '401') {
              this.router.navigate(['/signin']);
            }
          }
        };
    });
  };

  public redirectToDetails = (emp_id: string) => {
    let url: string = `/admin/details/${emp_id}`;
    this.router.navigate([url]);
  };

  public redirectToAvgKpiDetails = (emp_id: string) => {
    let url: string = `/admin/avgKpi/${emp_id}`;
    this.router.navigate([url]);
  };

  public redirectToUpdate = (emp_id: string) => {
    const updateUrl: string = `/admin/update/${emp_id}`;
    this.router.navigate([updateUrl]);
  };

  public delete = (emp_id: string) => {
    //console.log(element);
    this.employeeDelete
      .confirm('Please confirm..', 'Do you really want to Delete ?')
      .then((confirmed) => {
        console.log(`[confirmed]`, confirmed);
        if (!confirmed) {
          return;
        }
        const deleteUrl: string = `delete/${emp_id}`;
        this.repoService.delete(deleteUrl).subscribe(
          (res) => {
            console.log(res);
             this.getAllEmployees();
          },
          (error) => {
            console.log(error);
          }
        );
      });
  };

  public redirectToKpiDetails = (emp_id: string) => {
    let kpiurl: string = `/admin/sup_given_kpi_details/${emp_id}`;
    this.router.navigate([kpiurl]);
  };

  public redirectToDownload() {
    this.repoService.getDownload('download-data/').subscribe((res) => {
      let downloadLink = document.createElement('a');
      let blob = res.body as Blob;
      downloadLink.style.display = 'hidden';

      console.log('blob', blob);
      let blobData = window.URL.createObjectURL(
        new Blob([blob], { type: blob.type })
      );
      downloadLink.href = blobData;
      downloadLink.setAttribute('download', 'Kpi.xlsx');
      document.body.appendChild(downloadLink);
      downloadLink.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(blobData);
        downloadLink.remove();
      }, 350);

      console.warn(res);
    });
  }

  public redirectToEmployeeKpiDetails = (emp_id: string) => {
    let kpiurl: string = `/admin/emp_given_kpi_details/${emp_id}`;
    this.router.navigate([kpiurl]);
  };

  applyFilter(event: any) {
    const filterQuery = event.target.value.trim().toLowerCase(); // Remove whitespace
    // filterValue = filterValue.value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterQuery;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
