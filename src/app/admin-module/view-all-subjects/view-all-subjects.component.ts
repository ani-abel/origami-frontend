import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AdminService } from '../admin.service';
import { Subject } from 'src/app/services/origamiGraphql.service';
import { ApolloError } from 'apollo-client';
import { SubjectReMap } from 'src/app/types/internal-types.type';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-view-all-classes',
  templateUrl: './view-all-subjects.component.html',
  styleUrls: ['./view-all-subjects.component.css']
})
export class ViewAllSubjectsComponent implements OnInit {
  displayedColumns: string[] = ["S/N", "Name", "Category", "Actions"];
  dataSource: SubjectReMap[] = [];
  asyncSubjectList: BehaviorSubject<SubjectReMap[]> = new BehaviorSubject<SubjectReMap[]>([]);

  constructor(private readonly adminSrv: AdminService){ }

  ngOnInit(): void {
    this.adminSrv
        .getAllActiveSubjects()
        .subscribe(
          (response: Subject[]) => {
            let serialNumber: number = 0;
            const resolveSubjects = response.map((subj: Subject): SubjectReMap => {
              const { ClassCategory, Name, Id } = subj;
              serialNumber += 1;

              return {
                Id,
                ClassCategory,
                Name,
                SerialNumber: serialNumber
              }
            });

            //Set the Initial Values that will be displayed by the UI to an rxjs Subject
            this.asyncSubjectList.next(resolveSubjects);

            this.asyncSubjectList
                .asObservable()
                .subscribe(
                  (response: SubjectReMap[]) => {
                    this.dataSource = response;
                  },
                  (error) => {
                    throw error;
                  }
              )
          },
          (error: ApolloError) => {
            throw error;
          }
        );
  }

  deleteSubject(Id: string): void {
    if(!Id) {
      return;
    }
    this.adminSrv.deactivateSubject(Id);

    //Filter out the Deleted Class
    let serialNumber: number = 0;
    const filterOutDeletedField: SubjectReMap[] =
    this.dataSource
        .filter((schoolClass: SubjectReMap) => schoolClass.Id !== Id)
        .map((schoolClass: SubjectReMap) => {
          serialNumber += 1;
          const { Id, Name, ClassCategory } = schoolClass;

          return {
            SerialNumber: serialNumber,
            Id,
            Name,
            ClassCategory
          }
        });

    //Return data back to the RXJS subject
    this.asyncSubjectList.next(filterOutDeletedField);
  }

}
