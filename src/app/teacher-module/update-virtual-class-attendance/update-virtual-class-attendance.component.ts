import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-update-virtual-class-attendance',
  templateUrl: './update-virtual-class-attendance.component.html',
  styleUrls: ['./update-virtual-class-attendance.component.css']
})
export class UpdateVirtualClassAttendanceComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  selectedOptions: string[];

  constructor() { }

  onGroupsChange(options: MatListOption[]) {
    // map these MatListOptions to their values
    this.selectedOptions = options.map(o => o.value);
  }

  ngOnInit(): void {
  }

}
