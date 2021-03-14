import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { DiaryRecord } from '../diary-record';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  private diarySubscription: Subscription;
  private recordsBase: DiaryRecord[];
  rangeForm: FormGroup;
  rangeFrom: Date;
  rangeTo: Date;

  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  constructor(private diaryService: DiaryService) {
    const now = new Date();
    const monthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
      now.getHours()
    );
    this.rangeForm = new FormGroup({
      dateFrom: new FormControl(formatDate(monthAgo, 'yyyy-MM-dd', 'en'), [
        Validators.required,
      ]),
      dateTo: new FormControl(formatDate(now, 'yyyy-MM-dd', 'en'), [
        Validators.required,
      ]),
    });

    this.updateRangeDates();
  }

  ngOnInit(): void {
    this.diarySubscription = this.diaryService.diaryRecordsChanged.subscribe(
      (records) => {
        this.recordsBase = records;
        this.buildChart();
      }
    );
  }

  private buildChart() {
    const data = this.prepareData();

    const top = data.map((r) => r.top);
    const bottom = data.map((r) => r.bottom);
    const pulse = data.map((r) => r.pulse);
    const dates = data.map(
      (r) =>
        r.measureDate.toLocaleDateString() +
        ' ' +
        r.measureDate.toLocaleTimeString()
    );

    this.lineChartData = [
      { data: top, label: 'Skurczowe(górne)' },
      { data: bottom, label: 'Rozkurczowe(dolne)' },
      { data: pulse, label: 'Puls' },
    ];

    this.lineChartLabels = dates;
  }

  private prepareData() {
    return this.recordsBase
      .slice()
      .filter((record) => {
        const recordDate = record.measureDate;
        recordDate.setHours(0, 0, 0, 0);

        return recordDate >= this.rangeFrom && recordDate <= this.rangeTo;
      })
      .sort((a, b) => a.measureDate.getTime() - b.measureDate.getTime());
  }

  ngOnDestroy(): void {
    this.diarySubscription.unsubscribe();
  }

  onSubmit() {
    this.updateRangeDates();
    this.buildChart();
  }

  private updateRangeDates() {
    this.rangeFrom = new Date(this.rangeForm.controls['dateFrom'].value);
    this.rangeFrom.setHours(0, 0, 0, 0);
    this.rangeTo = new Date(this.rangeForm.controls['dateTo'].value);
    this.rangeTo.setHours(0, 0, 0, 0);

  }
}
