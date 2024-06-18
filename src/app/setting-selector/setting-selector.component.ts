import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-setting-selector',
  templateUrl: './setting-selector.component.html',
  styleUrls: ['./setting-selector.component.css']
})
export class SettingSelectorComponent {
  @Output() settingSelected = new EventEmitter<string>();
  settings = ['Medieval', 'Futuristic', 'Steampunk'];
  selectedSetting: string | null = null;

  confirmSelection() {
    if (this.selectedSetting) {
      this.settingSelected.emit(this.selectedSetting);
    }
  }
}
