import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-test-b',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './test-b.component.html',
  styleUrl: './test-b.component.css'
})
export class TestBComponent implements OnInit {

  title = null;

  ngOnInit() {
    console.log('TestBComponent init');
    setTimeout(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        console.log('TestBComponent loaded');
        this.title = json.title;
      });
    }, 3000)
  }
}
