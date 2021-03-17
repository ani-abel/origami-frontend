import { Component, OnInit } from '@angular/core';
import { ELEMENT_DATA } from 'src/app/admin-module/view-all-subjects/view-all-subjects.component';

@Component({
  selector: 'app-view-virtual-class-attendance',
  templateUrl: './view-virtual-class-attendance.component.html',
  styleUrls: ['./view-virtual-class-attendance.component.css']
})
export class ViewVirtualClassAttendanceComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
