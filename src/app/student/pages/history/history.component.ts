import { Component, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { AppState } from "app/reducers";
import { Router } from "@angular/router";
import { areFormIds, studentFormsSelector } from "../../student.selectors";
import { Observable } from "rxjs";
import { GraficasRepotesService } from "app/student/services/graficas-repotes.service";
import { Formularios } from "app/interfaces/Formularios.interface";
import { FormularioFormulario } from "../../../interfaces/Formularios.interface";
import {
  FormularioElement,
  Formulario,
} from "../../../interfaces/Formularios.interface";
//----
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexStroke,
  ApexFill,
} from "ng-apexcharts";
import { ChartDataSets } from "chart.js";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  fill: ApexFill;
};
//-----

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: [
    "./history.component.scss",
    "../../../../assets/sass/libs/datatables.scss",
  ],
})
export class HistoryComponent implements OnInit {
  points : any
  EstiloA : string
  ActivoT : string
  ReflexivoT : string
  TeoricoT: string
  PragmaticoT: string
  public rows$: Observable<any>;
  public areForms$: Observable<boolean>;
  public ColumnMode = ColumnMode;
  public tableHeaders = ["ID", "Fecha de presentación", "Acciones"];
  public SelectionType = SelectionType;
  options = { year: "numeric", month: "long", day: "numeric" };

  Formularios: FormularioElement[];
  Formulario: FormularioFormulario;
  Fechas: string[];
  FormData: number[];
  validator: string[] = ["a"];

  dataExist: boolean = false;

  rows = [];
  selected: FormularioElement | any = [];
  loadingIndicator = true;
  reorderable = true;

  columns = [
    { name: "Fecha", prop: "create_ad" },
    { name: "Activo", prop: "formulario.activo" },
    { name: "Reflexivo", prop: "formulario.reflexivo" },
    { name: "Teorico", prop: "formulario.teorico" },
    { name: "Pragmatico", prop: "formulario.pragmatico" },
  ];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private FormService: GraficasRepotesService
  ) {
    this.FormService.traerformularios().subscribe(({ formularios }) => {
      for (let i = 0; i < formularios.length; i++) {
        let fecha: any = formularios[i].create_ad;
        fecha = new Date(fecha);
        formularios[i].create_ad = fecha.toLocaleString();
      }
      this.rows = formularios;
    });
  }

  ngOnInit(): void {
  }

  onSelect({ selected }) {
    
   
    
    this.FormService.formulario(this.selected[0]._id).subscribe(
      ({ formulario }) => {
        this.Formulario = formulario.formulario;
        const id = formulario._id;

        for (let i = 0; i < this.validator.length; i++) {
          if (this.validator[i] === id) {
            return;
          }
        }

        const values = Object.values(formulario.formulario);
        const fecha = new Date(formulario.create_ad).toLocaleDateString();
        const color = "#xxxxxx".replace(/x/g, (y) =>
          ((Math.random() * 16) | 0).toString(16)
        );
        this.Data = [];
        var data = {
          data: [0,0,0,0],
          label: "0",
          backgroundColor: "0",
        };

        data = {
          data: values,
          label: fecha,
          backgroundColor: color,
        };

        const valores = values

        var obj = {a: 1, b: 2, undefined: 1};

       
        var estilos = {
          activo: formulario.formulario.activo,
          pragmatico: formulario.formulario.pragmatico,
          reflexivo: formulario.formulario.reflexivo,
          teorico: formulario.formulario.teorico
      };

      console.log("formulario.formulario: ", formulario.formulario)
      if(formulario.formulario.activo <= 6 ){
        this.ActivoT = 'Muy baja'
      }
      if(formulario.formulario.activo <= 8 && formulario.formulario.activo > 6 ){
        this.ActivoT = 'Baja'
      }
      if(formulario.formulario.activo > 8  && formulario.formulario.activo <=12){
        this.ActivoT = 'Moderada'
      }
      if(formulario.formulario.activo <= 14 && formulario.formulario.activo > 12 ){
        this.ActivoT = 'Alta'
      }
      if(formulario.formulario.activo > 14){
        this.ActivoT = 'Muy alta'
      }
      //REFLEXIVO
      if(formulario.formulario.reflexivo <= 10 ){
        this.ReflexivoT = 'Muy baja'
      }
      if(formulario.formulario.reflexivo <= 13 && formulario.formulario.reflexivo > 10 ){
        this.ReflexivoT = 'Baja'
      }
      if(formulario.formulario.reflexivo > 13  && formulario.formulario.reflexivo <=17){
        this.ReflexivoT = 'Moderada'
      }
      if(formulario.formulario.reflexivo <= 19 && formulario.formulario.reflexivo > 17 ){
        this.ReflexivoT = 'Alta'
      }
      if(formulario.formulario.reflexivo >= 20){
        this.ReflexivoT = 'Muy alta'
      }
      //TEORICO
      if(formulario.formulario.teorico <= 6 ){
        this.TeoricoT = 'Muy baja'
      }
      if(formulario.formulario.teorico <= 9 && formulario.formulario.teorico > 6 ){
        this.TeoricoT = 'Baja'
      }
      if(formulario.formulario.teorico > 9  && formulario.formulario.teorico <=13){
        this.TeoricoT = 'Moderada'
      }
      if(formulario.formulario.teorico <= 15 && formulario.formulario.teorico > 13 ){
        this.TeoricoT = 'Alta'
      }
      if(formulario.formulario.teorico > 15 ){
        this.TeoricoT = 'Muy alta'
      }
      const mayor =  Object.keys(estilos).reduce(function(a, b){ return estilos[a] > estilos[b] ? a : b });
      //PRAGMATICO
      if(formulario.formulario.pragmatico <= 8){
        this.PragmaticoT = 'Muy baja'
      }
      if(formulario.formulario.pragmatico <= 10 && formulario.formulario.pragmatico > 8 ){
        this.PragmaticoT = 'Baja'
      }
      if(formulario.formulario.pragmatico > 10  && formulario.formulario.pragmatico <=13){
        this.PragmaticoT = 'Moderada'
      }
      if(formulario.formulario.pragmatico <= 15 && formulario.formulario.pragmatico > 13 ){
        this.PragmaticoT = 'Alta'
      }
      if(formulario.formulario.pragmatico >= 16){
        this.PragmaticoT = 'Muy alta'
      }

      if(mayor == "activo"){
        this.EstiloA = "Activo"
        this.points = [
          "Los alumnos activos se involucran totalmente y sin prejuicios en las experiencias nuevas",
          "Disfrutan el momento presente y se dejan llevar por los acontecimientos",
          "Suelen ser entusiastas ante lo nuevo y tienden a actuar primero y pensar después en las consecuencias",
          "Llenan sus días de actividades y tan pronto disminuye el encanto de una de ellas se lanzan a la siguiente"
        ]
      }
      if(mayor == "pragmatico"){
        this.EstiloA = "Pragmatico"
        this.points = [
          "A los alumnos pragmáticos les gusta probar ideas, teorías y técnicas nuevas y comprobar si funcionan en la práctica",
          "Les gusta buscar ideas y ponerlas en práctica",
          "Inmediatamente les aburren e impacientan las largas discusiones, sobre la misma idea de forma interminable",
          "Son básicamente gente práctica, apegada a la realidad, a la que le gusta tomar decisiones y resolver problemas"
        ]
      }
      if(mayor == "reflexivo"){
        this.EstiloA = "Reflexivo"
        this.points = [
          "Los alumnos reflexivos tienden a adoptar la postura de un observador que analiza sus experiencias desde muchas perspectivas distintas",
          "Recogen datos y los analizan detalladamente antes de llegar a una conclusión. Para ellos lo más importante es la recolección de datos y su análisis concienzudo, así que procuran posponer las conclusiones todo lo que pueden",
          "Son precavidos y analizan todas las implicaciones de cualquier acción antes deponerse en movimiento",
          "En las reuniones observan y escuchan antes de hablar, procurando pasar desapercibidos"
        ]
      }
      if(mayor == "teorico"){
        this.EstiloA = "Teorico"
        this.points = [
          "Los alumnos teóricos adaptan e integran las observaciones que realizan en teorías complejas y bien fundamentadas lógicamente",
          "Piensan de forma secuencial y paso a paso, integrando hechos dispares en teoría coherentes",
          "Les gusta analizar y sintetizar la información y su sistema de valores premia la lógica y la racionalidad",
          "Se sienten incómodos con los juicios subjetivos y las técnicas de pensamiento lateral y las actividades fuera de lógica clara."
        ]
      }

        this.Data.push(data);

        this.validator.push(id);

        this.dataExist = true;

      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Grafica

  Data: ChartDataSets[] = [
    //{ data: [], label: "Vendedor A" },
    //{ data: [50, 250, 30, 450, 200], label: "Vendedor B" },
  ];
  Labels: string[] = ["Activo", "Reflexivo", "Teorico", "Pragmatico"];
}
