import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Component, OnInit, OnChanges } from '@angular/core';

export interface PeriodicElement {
  trimestre: string;
  receita: number;
  despesa: number;
  lucro: number;
  status: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnChanges {
  displayedColumns = ['trimestre', 'receita', 'despesa', 'lucro', 'status'];
  displayedFooter = ['trimestre', 'receita', 'despesa', 'lucro', 'status'];
  dataSource = ELEMENT_DATA;

  @Input() estado: string;
  @Input() ano: string;
  @Input() dadosFiltrados: any;

  @Output() dadosGr = ELEMENT_DATA;
  @Output() selectedYear: string;
  @Output() selectedState: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (this.dadosFiltrados) {
        ELEMENT_DATA = [];
        this.dadosFiltrados.map(item => {
          item.dadosEstado.map(trim => {
            let res = {
              trimestre: 'Trimestre ' + trim.trimestre, receita: trim.totalReceita, despesa: trim.totalDespesa,
              lucro: (trim.totalReceita - trim.totalDespesa), status: trim.meta
            }
            ELEMENT_DATA.push(res);
          })
        })
        this.dataSource = ELEMENT_DATA;
        this.dadosGr = ELEMENT_DATA;

        this.selectedYear = this.ano;
        this.selectedState = this.estado;
      }
    }
  }

  getTotalReceita() {
    return this.dataSource.map(d => d.receita).reduce((acc, value) => acc + value, 0);
  }
  getTotalDespesa() {
    return this.dataSource.map(d => d.despesa).reduce((acc, value) => acc + value, 0);
  }
  getTotalLucro() {
    return this.dataSource.map(d => d.receita - d.despesa).reduce((acc, value) => acc + value, 0);
  }
  getTotalStatus() {
    return this.dataSource.map(d => d.status).reduce((acc, value) => (acc + value) / this.dataSource.length, 0);
  }

  getImgStatus(val: number) {
    if (val > 0.8) {
      return '../../../assets/green.png'
    } else if ((val <= 0.8) && (val >= 0.5)) {
      return '../../../assets/yellow.png'
    } else {
      return '../../../assets/red.png'
    }
  }
}
let ELEMENT_DATA: PeriodicElement[] = [];
