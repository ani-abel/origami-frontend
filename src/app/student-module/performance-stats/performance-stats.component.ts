import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var Plotly: any;//declare plotly so is has a larger scope

@Component({
  selector: 'app-performance-stats',
  templateUrl: './performance-stats.component.html',
  styleUrls: ['./performance-stats.component.css']
})
export class PerformanceStatsComponent implements OnInit, AfterViewInit {
  @ViewChild("attendanceChart", { read: ElementRef }) attendanceChart: ElementRef;
  @ViewChild("subjectStrengthChart", { read: ElementRef }) subjectStrengthChart: ElementRef;

  graph = {
    data: [{
      values: [19, 26, 55],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie'
    }],
    layout: {
      //autosize: true,
      height: 400,
      width: 500
    }
  };
  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.loadAttendanceChart();
    this.loadSubjectStrengthChart();
  }

  loadSubjectStrengthChart(): void {
    const trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers'
    };

    const trace2 = {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines'
    };

    const trace3 = {
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers'
    };

    const data = [ trace1, trace2, trace3 ];

    const layout = {
      title:'Line and Scatter Plot',
      height: 400,
      width: 500
    };

    Plotly.newPlot(this.subjectStrengthChart.nativeElement, data, layout);
  }

  loadCATestChart(): void {

  }

  loadAttendanceChart(): void {
    const data = [{
      values: [19, 26, 55],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie'
    }];

    const layout = {
      //autosize: true,
      height: 400,
      width: 500
    };

    Plotly.newPlot(this.attendanceChart.nativeElement, data, layout);
  }

}
