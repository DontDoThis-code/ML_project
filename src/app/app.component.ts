import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ML_project';
  selectedSetting: string | null = null;

  onSettingSelected(setting: string) {
    this.selectedSetting = setting;
  }
}
