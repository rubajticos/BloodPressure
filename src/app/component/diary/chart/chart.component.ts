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
  rangeForm: FormGroup;

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
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), now.getHours());
    this.rangeForm = new FormGroup({
      dateFrom: new FormControl(formatDate(monthAgo,'yyyy-MM-dd','en'), [Validators.required]),
      dateTo: new FormControl(formatDate(now,'yyyy-MM-dd','en'), [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.diarySubscription = this.diaryService.diaryRecordsChanged.subscribe(
      (records) =>
        this.buildChart(
          records.sort(
            (a, b) => a.measureDate.getTime() - b.measureDate.getTime()
          )
        )
    );
  }

  private buildChart(records: DiaryRecord[]) {
    const top = records.map((r) => r.top);
    const bottom = records.map((r) => r.bottom);
    const pulse = records.map((r) => r.pulse);
    const dates = records.map(
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

  ngOnDestroy(): void {
    this.diarySubscription.unsubscribe();
  }

  onSubmit() {
    console.log('fromToSubmit called');
  }
}
