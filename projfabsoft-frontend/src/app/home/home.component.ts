import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'; //ALTERAR AQUI
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'; //ALTERAR AQUI

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [BaseChartDirective], //ALTERAR AQUI
  providers: [provideCharts(withDefaultRegisterables())] //ALTERAR AQUI
})
export class HomeComponent {
  //ALTERAR AQUI
  public chartData: ChartConfiguration['data'] = {
    labels: ['Janeiro', 'Fevereiro', 'Março'],
    datasets: [
      { data: [65, 59, 80], label: 'Vendas' },
      { data: [165, 159, 180], label: 'Pedidos' }
    ],
  };

  public chartOptions: ChartOptions = {
    responsive: true,
  };
  //ALTERAR AQUI
}