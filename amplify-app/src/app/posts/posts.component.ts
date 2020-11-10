import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/types/restaurant';
import { APIService } from '../API.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  title = 'amplify-posts-app';
  public createPost: FormGroup;

  /* declare restaurants variable */
  posts: Array<Post>;

  constructor(private api: APIService, private fb: FormBuilder, private router: Router) { }

  async ngOnInit() {
    this.createPost = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'owner': ['', Validators.required]
    });

    /* fetch restaurants when app loads */
    this.api.ListPosts().then(event => {
      this.posts = event.items;
    });

    /* subscribe to new restaurants being created */
    this.api.OnCreatePostListener.subscribe( (event: any) => {
      debugger;
      const newPost = event.value.data.OnCreatePost;
      this.posts = [newPost, ...this.posts];
    });
  }

  public onCreate(post: Post) {
    debugger;
    this.api.CreatePost(post).then(event => {
      console.log('post item created!');
      this.createPost.reset();
    })
    .catch(e => {
      console.log('error creating post...', e);
    });
  }

  public getRestaurants(){
    console.log("func 2 also works");
    this.router.navigate(["/"]);
  }

}
