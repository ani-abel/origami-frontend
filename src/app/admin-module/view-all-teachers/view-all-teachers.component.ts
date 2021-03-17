import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { PersonReMap } from 'src/app/types/internal-types.type';
import { AdminService } from '../admin.service';
import { OrigamiRole, Person } from 'src/app/services/origamiGraphql.service';

@Component({
  selector: 'app-view-all-teachers',
  templateUrl: './view-all-teachers.component.html',
  styleUrls: ['./view-all-teachers.component.css']
})
export class ViewAllTeachersComponent implements OnInit {
  displayedColumns: string[] = ["S/N", "Username", "Name", "Actions"];
  dataSource: PersonReMap[] = [];
  asyncTeacherList: BehaviorSubject<PersonReMap[]> = new BehaviorSubject<PersonReMap[]>([]);

  constructor(private readonly adminSrv: AdminService) { }

  ngOnInit(): void {
    this.adminSrv
        .getUserListByRole(OrigamiRole.Teacher)
        .subscribe(
          (response: Person[]) => {
            let serialNumber: number = 0;

            const resolveSubjects = response.map((person: Person): PersonReMap => {
              const { FirstName, LastName, Username, Id } = person;
              serialNumber += 1;

              return {
                Id,
                Name: `${FirstName} ${LastName}`,
                Username,
                SerialNumber: serialNumber
              }
            });

             //Set the Initial Values that will be displayed by the UI to an rxjs Subject
             this.asyncTeacherList.next(resolveSubjects);

             this.asyncTeacherList
                 .asObservable()
                 .subscribe(
                  (response: PersonReMap[]) => {
                    this.dataSource = response;
                  },
                  (error) => {
                    throw error;
                  }
               );
          }
        )
  }

  deleteTeacher(Id: string): void {
    if(!Id) {
      return;
    }

    this.adminSrv.deactivateUser(Id);

    //Filter out the Deleted Class
    let serialNumber: number = 0;
    const filterOutDeletedField: PersonReMap[] =
    this.dataSource
        .filter((schoolClass: PersonReMap) => schoolClass.Id !== Id)
        .map((person: PersonReMap) => {
          serialNumber += 1;
          const { Name, Username, Id } = person;

          return {
            Id,
            Name,
            Username,
            SerialNumber: serialNumber
          };
        });

    //Return data back to the RXJS subject
    this.asyncTeacherList.next(filterOutDeletedField);
  }

}
