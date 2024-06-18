import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { SettingSelectorComponent } from './setting-selector/setting-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    SettingSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
