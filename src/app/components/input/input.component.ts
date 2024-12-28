import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'brite-input',
  standalone: true,
  imports: [FloatLabelModule, InputTextModule, NgIf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = '';
  @Input() name = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() errorMessage = '';
  @Input() debounceTime = 300;
  @Output() debouncedValue = new EventEmitter<string>();

  value = signal<string>('');
  private inputSubject = new Subject<string>();
  private destroy$ = new Subject<void>();


  onChange = (value: string) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value.set(inputValue);
    this.inputSubject.next(inputValue);
    this.onChange(inputValue);
  }

  ngOnInit(): void {
    this.inputSubject
      .pipe(debounceTime(this.debounceTime), takeUntil(this.destroy$))
      .subscribe((debouncedValue) => {
        this.debouncedValue.emit(debouncedValue);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
