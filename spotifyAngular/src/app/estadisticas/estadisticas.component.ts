import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-estadisticas',
  standalone: false,
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.cargarLikesPlaylist();
    this.cargarReproduccionesPlaylist();
    this.cargarEdadesUsuarios();
    this.cargarTopCanciones();
    this.cargarReproduccionesPorGenero();
  }

  /* NO aparece?? */
  private cargarLikesPlaylist(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/estadisticas/likes')
      .subscribe(data => {
        const ctx = document.getElementById('likesPlaylist') as HTMLCanvasElement;
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map(item => item.nombre),
            datasets: [{
              label: 'Likes por Playlist',
              data: data.map(item => item.likes),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgb(0, 238, 255)',
              borderWidth: 1
            }]
          },
          options: { responsive: true }
        });
      });
  }

  private cargarReproduccionesPlaylist(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/estadisticas/reproducciones')
      .subscribe(data => {
        const ctx = document.getElementById('reproduccionesPlaylist') as HTMLCanvasElement;
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map(item => item.nombre),
            datasets: [{
              label: 'Reproducciones por Playlist',
              data: data.map(item => item.reproducciones),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1
            }]
          },
          options: { responsive: true }
        });
      });
  }

  private cargarEdadesUsuarios(): void {
    this.http.get<any>('http://127.0.0.1:8000/estadisticas/edades')
      .subscribe(data => {
        const ctx = document.getElementById('edadesUsuarios') as HTMLCanvasElement;
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: 'Distribución de Edades',
              data: Object.values(data),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50']
            }]
          },
          options: { responsive: true }
        });
      });
  }

  private cargarTopCanciones(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/estadisticas/topCanciones')
      .subscribe(data => {
        const ctx = document.getElementById('topCanciones') as HTMLCanvasElement;
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map(item => item.titulo),
            datasets: [{
              label: 'Reproducciones',
              data: data.map(item => item.reproducciones),
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1
            }]
          },
          options: { responsive: true }
        });
      });
  }

  private cargarReproduccionesPorGenero(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/estadisticas/cancionesGenero')
      .subscribe(data => {
        const ctx = document.getElementById('reproduccionesGenero') as HTMLCanvasElement;
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: data.map(item => item.genero),
            datasets: [{
              label: 'Reproducciones por Género',
              data: data.map(item => item.reproducciones),
              backgroundColor: ['#8E44AD', '#2980B9', '#27AE60', '#E74C3C', '#F39C12']
            }]
          },
          options: { responsive: true }
        });
      });
  }
}