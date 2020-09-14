import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  recentMovies: Movie[] = [];
  popularMovies: Movie[] = [];

  constructor(private moviesSrv: MoviesService) { }

  ngOnInit() {
    this.moviesSrv.getMovies().subscribe(resp => {
      const arrTemp = [...this.recentMovies, ...resp.results];
      this.recentMovies = arrTemp;
    });

    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesSrv.getPopularMovies().subscribe(resp => {
      const arrTemp = [...this.popularMovies, ...resp.results];
      this.popularMovies = arrTemp;
    });
  }

}
