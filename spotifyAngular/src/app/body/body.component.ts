import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  standalone: false,
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  canciones: any[] = [];
  playlists: any[] = [];
  estadisticas: any[] = [];
  cancionSeleccionada: any = null;
  audioSrc: string = "";
  mostrarReproductor: boolean = false;
  currentSong: any = null; //Guarda la canción actual que se está reproduciendo

  constructor() { }

  ngOnInit() {
    //canciones
    fetch('http://127.0.0.1:8000/canciones')
      .then(response => response.json())
      .then(data => {
        this.canciones = data;
      })
      .catch(error => console.error('Error al cargar canciones:', error));

    //playlists
    fetch('http://127.0.0.1:8000/mostrarPlaylist')
      .then(response => response.json())
      .then(data => {
        this.playlists = data;
      })
      .catch(error => console.error('Error:', error));

    fetch('http://127.0.0.1:8000/manager/estadisticas')
      .then(response => response.json())
      .then(data => {
        this.estadisticas = data;
        console.log(this.estadisticas)
      })
      .catch(error => console.error('Error:', error));
  }

  //Reproducir la canción seleccionada
  reproducirCancion(cancion: any) {
    /* this.cancionSeleccionada = cancion; */
    this.currentSong = cancion; //currentSong se actualiza
    this.audioSrc = `assets/audio/${cancion.titulo.toLowerCase().replace(/\s+/g, '_')}.mp3`;
    this.mostrarReproductor = true;

    const audioElement = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (audioElement) {
      audioElement.load();  //Carga la nueva canción
      audioElement.play();  //La reproduce automáticamente
    }
  }

  //reproducir la siguiente canción
  nextSong() {
    if (!this.currentSong) return;

    let currentIndex = this.canciones.findIndex(c => c === this.currentSong);
    if (currentIndex < this.canciones.length - 1) {
      this.currentSong = this.canciones[currentIndex + 1];
    } else {
      //Cuando se llega al final, vuelve a la primera
      this.currentSong = this.canciones[0];
    }

    this.audioSrc = `assets/audio/${this.currentSong.titulo.toLowerCase().replace(/\s+/g, '_')}.mp3`;
    const audioElement = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (audioElement) {
      audioElement.load();
      audioElement.play();
    }
  }
  //detectar cuando la canción ha terminado (y poner en html (ended)())
  onSongEnded() {
    this.nextSong(); //Llamar pasar a la siguiente canción
  }

  //reproducir la canción anterior
  prevSong() {
    if (!this.currentSong) return; //Si no hay canción actual, no hacer nada

    let currentIndex = this.canciones.findIndex(c => c === this.currentSong);
    if (currentIndex > 0) {
      this.currentSong = this.canciones[currentIndex - 1];
      this.audioSrc = `assets/audio/${this.currentSong.titulo.toLowerCase().replace(/\s+/g, '_')}.mp3`; //mp3
      this.reproducirCancion(this.currentSong); //Reproducir la canción anterior
    }
  }

  //lista de canciones aleatoria (aleatoriza la posicion de las canciones )
  shuffleSongs() {
    for (let i = this.canciones.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.canciones[i], this.canciones[j]] = [this.canciones[j], this.canciones[i]]; //Intercambia las canciones
    }
  }

  //reproducir una canción aleatoria
  playRandomSong() {
    this.shuffleSongs(); //barajar canciones
    this.currentSong = this.canciones[0]; //Selecciona la primera canción de la lista aleatoria
    this.audioSrc = `assets/audio/${this.currentSong.titulo.toLowerCase().replace(/\s+/g, '_')}.mp3`;
  }

}