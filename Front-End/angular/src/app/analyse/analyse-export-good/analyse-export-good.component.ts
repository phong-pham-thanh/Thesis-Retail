import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AnalyseService } from '../../services/analyse.service';
import { DateParam, GoodNoteAnalyse } from '../../model/analyse.model';
import { UtilitiesService } from '../../common/utilities.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-analyse-export-good',
  templateUrl: './analyse-export-good.component.html',
  styleUrls: ['./analyse-export-good.component.scss']
})
export class AnalyseExportGoodComponent {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  startDate: Date;
  endDate: Date;

  chartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      }
    ]
  };
  chartType: ChartType = 'pie';
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Số lượng sản phẩm xuất kho', 
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
        color: '#333333',
      }
    }
  };

  constructor(private analyseService: AnalyseService) {}

  ngOnInit() {
    const dateRange = new DateParam();

    this.loadChartData(dateRange);
  }

  loadChartData(dateRange: DateParam) {
    this.analyseService.getProductExport(dateRange).subscribe((data: GoodNoteAnalyse[]) => {
      this.chartData.labels = data.map(d => `${d.productName}`);
      this.chartData.datasets[0].data = data.map(d => d.quantity);
      this.chartData.datasets[0].backgroundColor = UtilitiesService.generateRandomColors(data.length);

      this.chart?.update();
    });
  }

  onDateRangeChange(event: MatDatepickerInputEvent<moment.Moment>) {
    const selectedDate: Date = event.value ? event.value.toDate() : null;
    const dateRange = new DateParam();
    if (event.targetElement?.getAttribute('matStartDate') !== null) {
      this.startDate = selectedDate;
    } else if (event.targetElement?.getAttribute('matEndDate') !== null) {
      this.endDate = selectedDate;
    }
    dateRange.startDate = this.startDate;
    dateRange.endDate = this.endDate;
    this.loadChartData(dateRange);
  }
}
