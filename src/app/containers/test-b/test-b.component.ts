import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {TestCComponent} from "../../components/test-c/test-c.component";

@Component({
  selector: 'app-test-b',
  standalone: true,
  imports: [
    NgIf,
    TestCComponent
  ],
  templateUrl: './test-b.component.html',
  styleUrl: './test-b.component.css'
})
export class TestBComponent {

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
