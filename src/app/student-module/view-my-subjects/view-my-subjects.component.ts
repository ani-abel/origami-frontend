import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { StudentSubjectListReMap } from 'src/app/types/internal-types.type';
import { StudentService } from '../student.service';
import { Student_Subject } from '../../services/origamiGraphql.service';

@Component({
  selector: 'app-view-my-subjects',
  templateUrl: './view-my-subjects.component.html',
  styleUrls: ['./view-my-subjects.component.css']
})
export class ViewMySubjectsComponent implements
OnInit,
OnDestroy {
  displayedColumns: string[] = [
    'S/N',
    'Subject',
    'Category',
    'Actions'
  ];
  dataSource: StudentSubjectListReMap[] = [];
  subscriptionList: Subscription[] = [];

  constructor(private readonly studentSrv:  StudentService) { }

  ngOnInit(): void {
    const getSubjectList: Subscription =
    this.studentSrv
        .getSubjectsAssignedToStudent()
        .subscribe(
          (response: Student_Subject[]) => {
            this.dataSource = response.map((studentSubject: Student_Subject, index: number) => {
              const { ClassCategory, DateCreated, Id, Name } = studentSubject.Subject;
              return {
                Id,
                ClassCategory,
                DateCreated,
                SerialNumber: index + 1,
                Subject: Name
              }
            });
          },
          (error) => {
            throw error;
          }
        );
    this.subscriptionList.push(getSubjectList);
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
