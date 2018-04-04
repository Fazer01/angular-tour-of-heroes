import { Component } from '@angular/core';
import {Message} from 'primeng/components/common/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  msgs: Message[] = [];
  tests = ['Test1', 'Test2', 'Test3', 'test4', 'blaat5'];

}
