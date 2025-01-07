import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RadioGroupComponent } from "./components/radio-group/radio-group.component";
import { InputComponent } from './components/input/input.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Correct import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RadioGroupComponent,
    InputComponent,
    ReactiveFormsModule,
    NgIf,
    SidebarComponent,
    RouterOutlet, // Ensure RouterOutlet is imported
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  radioOptions = ['1-10', '10-50', '50-100', '100+'];
  selectedRadioOption = '';
  errorMessage = "Please select an option";

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
      username: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onDebouncedSearch(value: string): void {
    console.log('Debounced Search Term:', value);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log("Input value:", value);
  }

  onRadioOptionSelected(option: string) {
    this.selectedRadioOption = option;
    console.log(`Selected option: ${option}`);
  }
}
