import { Input } from '@angular/core';
import { Component, Output, OnInit } from '@angular/core';
import { Dados } from '../../models/portal';
import { ApiService } from '../../services/api.service'

export interface Estado {
  value: string;
  viewValue: string;
}

export interface Ano {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() estado: string;
  @Output() ano: string;
  @Output() dadosFiltrados: any;


  dados: any;
  selectedState: string;
  states: Estado[];
  years: Ano[];
  err: any;
  auxEstados: any;

  constructor(private ApiService: ApiService) {
    this.getDados();
  }
  ngOnInit() { }

  getDados() {
    this.ApiService.getData().subscribe(
      (data: Dados) => {
        this.dados = data;
        this.auxEstados = data;
        let todos = { value: 'Todos', viewValue: 'Todos' }

        this.states = this.auxEstados.map(item => {

          return {
            value: item.nomeEstado, viewValue: item.nomeEstado
          }
        })


        this.states = this.states.filter(function (a) {
          return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null));

        this.states.sort(function (a, b) {
          return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
        })

        this.states.unshift(todos);
      },
      (error: any) => {
        this.err = error;
        console.log('Error', error);
      }
    );
  }

  // selectedState: string;
  selectedYear: string;

  onStateChange() {
    if ((this.dados || []).length) {
      let anosEstado = [];
      this.dados.map(year => {
        if (this.selectedState === year.nomeEstado) {
          let aux = { value: year.ano, viewValue: year.ano }

          anosEstado.push(aux);
        } else if (this.selectedState === 'Todos') {
          let aux = { value: year.ano, viewValue: year.ano }
          anosEstado.push(aux);
        }
      })

      if (anosEstado.length) {
        this.years = anosEstado;
      }

      let reduced = [];

      this.years.forEach((item) => {
        let duplicated = reduced.findIndex(redItem => {
          return item.value == redItem.value;
        }) > -1;

        if (!duplicated) {
          reduced.push(item);
        }
      });


      reduced.sort(function (a, b) {
        return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
      })
      let auxT = { value: 'Todos', viewValue: 'Todos' }
      reduced.unshift(auxT)
      this.years = reduced
    }
  }

  onYearAndStateSelected() {
    this.estado = this.selectedState;
    this.ano = this.selectedYear;
  }

  filter() {

    if (this.selectedState !== 'Todos' && this.selectedYear !== 'Todos') {
      this.dadosFiltrados = this.dados.filter(item => {
        if ((this.selectedState === item.nomeEstado)
          && (this.selectedYear === item.ano)) {
          return { ...item }
        }
      })
    } else if (this.selectedState === 'Todos' && this.selectedYear !== 'Todos') {
      this.dadosFiltrados = this.dados.filter(item => {
        if (this.selectedYear === item.ano) {
          return { ...item }
        }
      })

    } else if (this.selectedState !== 'Todos' && this.selectedYear === 'Todos') {
      this.dadosFiltrados = this.dados.filter(item => {
        if (this.selectedState === item.nomeEstado) {
          return { ...item }
        }
      })
    } else {
      this.dadosFiltrados = this.dados.filter(item => {
        return { ...item }
      })
    }
  }

  reset() {
    this.dadosFiltrados = '';
    this.selectedState = '';
    this.selectedYear = '';
  }

}
