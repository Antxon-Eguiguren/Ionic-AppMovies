import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { MovieDetails } from '../interfaces/interfaces';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  movies: MovieDetails[] = [];

  constructor(private toastCtrl: ToastController) {
    this.cargarPeliculasFavoritas();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration: 1500,
      translucent: false,
      color: 'primary'
    });
    toast.present();
  }

  async guardarPeliculaFavorita(movie: MovieDetails) {
    const encontrado = this.movies.find(item => item.id === movie.id);

    let mensaje = '';

    if (encontrado) {
      this.movies = this.movies.filter(item => item.id !== movie.id);
      mensaje = 'Deleted from Favourites!';
    } else {
      this.movies.push(movie);
      mensaje = 'Added to Favourites!';
    }

    await Storage.set({
      key: 'peliculas',
      value: JSON.stringify(this.movies)
    });

    this.presentToast(mensaje);
  }

  async cargarPeliculasFavoritas() {
    const itemsLS = await Storage.get({ key: 'peliculas' });
    const moviesLS = JSON.parse(itemsLS.value);
    this.movies = moviesLS || [];
    return this.movies;
  }

  async existePelicula(id) {
    await this.cargarPeliculasFavoritas();
    const existe = this.movies.find(item => item.id === id);

    return (existe) ? true : false;
  }
}
