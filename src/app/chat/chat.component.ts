import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() setting: string | undefined;
  messages: { role: string, content: string }[] = [];
  fullscreenImage: string | null = null;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef | undefined;

  constructor(private openAIService: DataService) { }

  ngOnInit(): void {
    this.initializeGameContext();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  initializeGameContext(): void {
    if (this.setting) {
      const initialMessage = `You are a game master for a tabletop RPG set in a ${this.setting} world. 
      Describe the beginning of the adventure for the player. 
      Write two paragraphs: the first describing what is happening, and the second providing a physical description of the scene. 
      Use the separator "----" between the two paragraphs. 
      Ensure the second paragraph is below 1000 characters in length.`;
  
      this.messages.push({ role: 'system', content: initialMessage });
  
      this.openAIService.getChatResponseWithImage(this.messages)
        .subscribe(
          res => {
            const chatResponse = res.chatResponse.choices[0].message.content;
            const parts = chatResponse.split('----');
            const firstParagraph = parts[0] ? parts[0].trim() : 'No description provided.';
            const secondParagraph = parts[1] ? parts[1].trim() : 'No scene provided.';
            const imageUrl = res.imageResponse.data[0].url;
  
            this.messages.push({ role: 'assistant', content: firstParagraph });
            this.messages.push({ role: 'assistant', content: `![Image](${imageUrl})` });
          },
          err => {
            console.error('Error occurred:', err);
          }
        );
    }
  }
  
  

  sendMessage(userInput: string): void {
    if (userInput.trim()) {
      this.messages.push({ role: 'user', content: userInput });
  
      this.openAIService.getChatResponseWithImage(this.messages)
        .subscribe(
          res => {
            const chatResponse = res.chatResponse.choices[0].message.content;
            const parts = chatResponse.split('----');
            const firstParagraph = parts[0] ? parts[0].trim() : 'No description provided.';
            const secondParagraph = parts[1] ? parts[1].trim() : 'No scene provided.';
            const imageUrl = res.imageResponse.data[0].url;
  
            this.messages.push({ role: 'assistant', content: firstParagraph });
            this.messages.push({ role: 'assistant', content: `![Image](${imageUrl})` });
          },
          err => {
            console.error('Error occurred:', err);
          }
        );
    }
  }
  

  extractImageUrl(messageContent: string): string {
    const match = messageContent.match(/\((.*?)\)/);
    return match ? match[1] : '';
  }

  openImageFullscreen(imageUrl: string): void {
    this.fullscreenImage = imageUrl;
  }

  closeImageFullscreen(): void {
    this.fullscreenImage = null;
  }

  scrollToBottom(): void {
    try {
      if (this.myScrollContainer) {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }
}
