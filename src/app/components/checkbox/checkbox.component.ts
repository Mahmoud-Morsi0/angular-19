import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'brite-checkbox',
  imports: [FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements OnInit {
  form: FormGroup | undefined;
  lable = input<string>("")
  value = output<string>()

  ngOnInit() {
    this.form = new FormGroup({
      city: new FormControl<string | null>(null)
    });
  }

  onClick(event: Event) {
    this.value.emit((event.target as HTMLInputElement).value);
  }

}
