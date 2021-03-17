import { Component, OnInit } from '@angular/core';
import { ELEMENT_DATA } from 'src/app/admin-module/view-all-subjects/view-all-subjects.component';

@Component({
  selector: 'app-view-virtual-classes',
  templateUrl: './view-virtual-classes.component.html',
  styleUrls: ['./view-virtual-classes.component.css']
})
export class ViewVirtualClassesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status', 'actions'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }

}
