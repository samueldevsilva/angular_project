import { Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Component, OnChanges } from '@angular/core';
import { Chart } from 'angular-highcharts'
import { Options } from 'highcharts';
import { barChartOptions } from '../../helpers/barChartOptions'
import { pieChartOptions } from '../../helpers/pieChartOptions'

export interface PeriodicElement {
  trimestre: string;
  receita: number;
  despesa: number;
  lucro: number;
  status: number;
}

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnChanges {
  @Input() dadosGr: PeriodicElement;
  @Input() selectedYear: string;
  @Input() selectedState: string;

  data = [];
  categorias = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let auxData = [];
    let auxCat = [];
    if (changes) {
      console.log(changes);
      changes.dadosGr.currentValue.map(item => {
        auxData.push({
          data: [{ y: item.meta }]
        })
        auxCat.push(item.trimestre)
      })
    }
    this.data = auxData[0].data
    this.categorias = auxCat;

  }


  barChartData(dados: any, categ: any): Options {
    return {
      chart: {
        type: 'bar',
      },
      credits: {
        enabled: true,
      },
      title: {
        text: 'Resultado da meta',
      },
      yAxis: {
        visible: true,
        gridLineColor: '#eee',
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        lineColor: '#fff',
        categories: categ,
      },

      plotOptions: {
        series: {
          borderRadius: 5,
        } as any,
      },

      series: [
        {
          type: 'bar',
          color: '#506ef9',
          data: dados,
        },
      ],
    };
  }
  barChart = new Chart(barChartOptions);

  pieChart = new Chart(pieChartOptions);
}