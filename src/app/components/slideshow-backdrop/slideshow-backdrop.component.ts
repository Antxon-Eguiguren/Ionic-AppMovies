import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() movies: Movie[] = [];

  slideOpts = {
    slidesPerView: 1.2,
    freeMode: true
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  async lanzarModalDetalle(movieId: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { movieId }
    });
    await modal.present();
  }

}
