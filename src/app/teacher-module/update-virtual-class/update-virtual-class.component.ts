import { Component, OnInit } from '@angular/core';

export interface Food { value: string, viewValue: string};

@Component({
  selector: 'app-update-virtual-class',
  templateUrl: './update-virtual-class.component.html',
  styleUrls: ['./update-virtual-class.component.css']
})
export class UpdateVirtualClassComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

  myFilter(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

}
