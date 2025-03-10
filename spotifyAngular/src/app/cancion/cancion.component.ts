import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cancion',
  standalone: false,
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.css']
})
export class CancionComponent {
  @Input() titulo!: string;
  @Input() autor!: string;
  @Output() onPlay: EventEmitter<any> = new EventEmitter();

  
  //imagen por defecto
  imagen: string = 'assets/images/iconoMusic.png';

  reproducir() {
    this.onPlay.emit({ titulo: this.titulo, autor: this.autor });
  }
}