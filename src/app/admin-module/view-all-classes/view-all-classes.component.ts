import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ApolloError } from 'apollo-client';
import { AdminService } from '../admin.service';
import { School_Class } from '../../services/origamiGraphql.service';
import { SchoolClassReMap } from 'src/app/types/internal-types.type';

@Component({
  selector: 'app-view-all-classes',
  templateUrl: './view-all-classes.component.html',
  styleUrls: ['./view-all-classes.component.css']
})
export class ViewAllClassesComponent implements OnInit {
  displayedColumns: string[] = ["S/N", "Name", "Category", "Actions"];
  dataSource: SchoolClassReMap[];
  asyncDataSource: BehaviorSubject<SchoolClassReMap[]> = new BehaviorSubject<SchoolClassReMap[]>([]);

  constructor(private readonly adminSrv: AdminService) { }

  ngOnInit(): void {
    this.adminSrv.getClasses().subscribe(
      (response: School_Class[]) => {
        let serialNumber: number = 0;

        //Remap the returned object to have a S/N index
        const remapDataSource: SchoolClassReMap[] = response.map((schoolClass: School_Class) => {
          serialNumber += 1;
          const { Id, Name, ClassCategory } = schoolClass;

          return {
            SerialNumber: serialNumber,
            Id,
            Name,
            ClassCategory
          }
        });

        this.asyncDataSource.next(remapDataSource);

        this.asyncDataSource
            .asObservable()
            .subscribe(
              (subjectResponse: SchoolClassReMap[]) => {
                this.dataSource = subjectResponse;
            },
            (error) => {
              throw error;
            }
          );
      },
      (error: ApolloError) => {
        throw error;
      }
    )
  }

  deleteClass(Id: string): void {
    if(!Id) {
      return;
    }
    this.adminSrv.deactivateClass(Id);

    //Filter out the Deleted Class
    let serialNumber: number = 0;
    const filterOutDeletedField: SchoolClassReMap[] =
    this.dataSource
        .filter((schoolClass: SchoolClassReMap) => schoolClass.Id !== Id)
        .map((schoolClass: SchoolClassReMap) => {
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
    this.asyncDataSource.next(filterOutDeletedField);
  }

}
