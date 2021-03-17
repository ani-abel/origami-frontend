import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-assign-subject-to-teacher',
  templateUrl: './assign-subject-to-teacher.component.html',
  styleUrls: ['./assign-subject-to-teacher.component.css']
})
export class AssignSubjectToTeacherComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  selectedOptions: string[];

  constructor() { }

  onGroupsChange(options: MatListOption[]) {
    // map these MatListOptions to their values
    this.selectedOptions = options.map(o => o.value);
  }

  ngOnInit(): void { }

}
