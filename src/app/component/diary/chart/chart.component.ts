import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private diaryService: DiaryService) {}

  ngOnInit(): void {
    this.diarySubscription = this.diaryService.diaryRecordsChanged.subscribe(
      (records) => this.buildChart(records.sort((a, b) => a.measureDate.getTime() - b.measureDate.getTime()))
    );
  }

  private buildChart(records: DiaryRecord[]) {
    const top = records.map(r => r.top);
    const bottom = records.map(r => r.bottom);
    const pulse = records.map(r => r.pulse);
    const dates = records.map(r => r.measureDate.toLocaleDateString() + ' ' + r.measureDate.toLocaleTimeString());

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
}
