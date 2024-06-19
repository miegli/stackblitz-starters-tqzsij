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
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        this.title = json.title;
      });
  }
}
