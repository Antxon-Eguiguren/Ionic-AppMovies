import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slide-show-pares',
  templateUrl: './slide-show-pares.component.html',
  styleUrls: ['./slide-show-pares.component.scss'],
})
export class SlideShowParesComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
    slidesPerView: 2.5,
    freeMode: true,
    spaceBetween: -10
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  onClick() {
    this.cargarMas.emit();
  }

  async lanzarModalDetalle(movieId: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { movieId }
    });
    await modal.present();
  }
}
