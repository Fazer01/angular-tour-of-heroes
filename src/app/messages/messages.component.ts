import {Component} from '@angular/core';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {    
  
  msgs: Message[] = [];

  constructor(private messageService: MessageService)
  {

  }
  showViaService()
  {   
    this.messageService.add({severity:'success', summary:'Success Message', detail:'Order submitted'});
  }
    clearViaService() {
      this.messageService.clear();
    }
}