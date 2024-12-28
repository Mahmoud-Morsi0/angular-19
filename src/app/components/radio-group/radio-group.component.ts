import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';

@Component({
  selector: 'brite-radio-group',
  imports: [NgFor, NgIf],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss'
})
export class RadioGroupComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() selectedOption: string = '';
  @Output() optionSelected = new EventEmitter<string>();

  ngOnInit() {
    if (!this.selectedOption && this.options.length > 0) {
      console.log("object selected");
      this.selectedOption = this.options[0];
      this.optionSelected.emit(this.selectedOption);
    }
  }
  onOptionSelected(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
  }
}

