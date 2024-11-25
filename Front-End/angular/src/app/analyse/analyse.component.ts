import { Component, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AnalyseService } from '../services/analyse.service';
import { DateParam, GoodNoteAnalyse } from '../model/analyse.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType, registerables  } from 'chart.js';
import Chart from 'chart.js/auto';
import { UtilitiesService } from '../common/utilities.service';
Chart.register(...registerables);

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss'],
})
export class AnalyseComponent {

  
}
