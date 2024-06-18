import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private chatApiUrl = 'https://api.openai.com/v1/chat/completions';
  private imageApiUrl = 'https://api.openai.com/v1/images/generations';
  private apiKey = environment.openAIKey;

  constructor(private http: HttpClient) { }

  getChatResponseWithImage(messages: { role: string, content: string }[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const chatBody = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 256
    };

    return this.http.post<any>(this.chatApiUrl, chatBody, { headers }).pipe(
      switchMap(chatResponse => {
        const chatContent = chatResponse.choices[0].message.content;
        const [description, scene] = chatContent.split("----");
        console.log(description, scene);

        const imageBody = {
          prompt: scene.trim(),
          n: 1,
          size: '512x512'
        };

        return forkJoin({
          chatResponse: this.http.post<any>(this.chatApiUrl, chatBody, { headers }),
          imageResponse: this.http.post<any>(this.imageApiUrl, imageBody, { headers })
        }).pipe(
          map(responses => ({
            description: description.trim(),
            scene: scene.trim(),
            chatResponse: responses.chatResponse,
            imageResponse: responses.imageResponse
          }))
        );
      })
    );
  }
}
