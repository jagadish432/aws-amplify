import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant } from 'src/types/restaurant';
import { APIService } from '../API.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  title = 'amplify-angular-app';
  public createForm: FormGroup;

  /* declare restaurants variable */
  restaurants: Array<Restaurant>;

  constructor(private api: APIService, private fb: FormBuilder, private router: Router) { }

  async ngOnInit() {
    this.createForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'city': ['', Validators.required]
    });

    /* fetch restaurants when app loads */
    this.api.ListRestaurants().then(event => {
      this.restaurants = event.items;
    });

    /* subscribe to new restaurants being created */
    this.api.OnCreateRestaurantListener.subscribe( (event: any) => {
      const newRestaurant = event.value.data.onCreateRestaurant;
      this.restaurants = [newRestaurant, ...this.restaurants];
    });
  }

  public onCreate(restaurant: Restaurant) {
    this.api.CreateRestaurant(restaurant).then(event => {
      console.log('item created!');
      this.createForm.reset();
    })
    .catch(e => {
      console.log('error creating restaurant...', e);
    });
  }

  public getPosts(){
    console.log("func works");
    this.router.navigate(["posts"]);
  }

}
