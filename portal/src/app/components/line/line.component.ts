import { Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Component, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

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
          name: item.trimestre,
          data: [item.lucro]
        })
        auxCat.push(item.trimestre)
      })
    }
    this.data = auxData;
    this.chartOptions.xAxis.categories = auxCat;
    console.log(this.data);
    console.log(this.chartOptions.xAxis.categories);

  }

  title = 'Evolução dos Lucros';

  data = [];

  highcharts = Highcharts;
  chartOptions = {
    chart: {
      type: "spline"
    },
    title: {
      text: "Evolução dos Lucros"
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: "Lucro"
      }
    },
    series: this.data
  };
}
