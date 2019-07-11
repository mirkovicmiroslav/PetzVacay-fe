import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminManagementService } from 'src/app/core/services/admin-management.service';

@Component({
  selector: 'app-add-service-type',
  templateUrl: './add-service-type.component.html',
  styleUrls: ['./add-service-type.component.css']
})
export class AddServiceTypeComponent implements OnInit {
  description: String = '';

  @ViewChild('addServiceType')
  addServiceType: NgForm;

  constructor(private router: Router, private toastr: ToastrService, private adminService: AdminManagementService) {}

  ngOnInit() {}

  createServiceType() {
    this.adminService.addServiceType(this.description).subscribe(
      response => {
        this.toastr.success('Successfuly added new service type!');
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.toastr.error('Failed to add service type.');
      }
    );
  }
}
