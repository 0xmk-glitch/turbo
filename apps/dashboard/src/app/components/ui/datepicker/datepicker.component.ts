import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnInit,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

export interface DatepickerConfig {
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  min?: Date;
  max?: Date;
  startView?: 'month' | 'year' | 'multi-year';
  touchUi?: boolean;
}

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {
  @Input() label?: string;
  @Input() placeholder = 'Select date';
  @Input() hint?: string;
  @Input() hintAlign: 'start' | 'end' = 'start';
  @Input() appearance: 'outline' | 'fill' = 'fill';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() min?: Date;
  @Input() max?: Date;
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';
  @Input() touchUi = false;
  @Input() suffixIcon = 'calendar_today';
  @Input() suffixIconClass = '';
  @Input() tooltip?: string;
  @Input() tooltipPosition: 'above' | 'below' | 'left' | 'right' = 'above';
  @Input() errorMessage?: string;
  @Input() formControl?: FormControl;

  @Output() valueChange = new EventEmitter<Date | null>();
  @Output() dateChange = new EventEmitter<Date | null>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();

  value: Date | null = null;
  private onChange = (value: Date | null) => {};
  private onTouched = () => {};

  ngOnInit() {
    if (this.formControl) {
      this.value = this.formControl.value;
    }
  }

  writeValue(value: Date | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateChange(date: Date | null): void {
    this.value = date;
    this.onChange(date);
    this.onTouched();
    this.valueChange.emit(date);
    this.dateChange.emit(date);
  }

  onInputFocus(event: FocusEvent): void {
    this.focusEvent.emit(event);
  }

  onInputBlur(event: FocusEvent): void {
    this.onTouched();
    this.blurEvent.emit(event);
  }

  getFormFieldClasses(): string {
    const classes = ['app-datepicker'];
    if (this.appearance) {
      classes.push(`app-datepicker--${this.appearance}`);
    }
    return classes.join(' ');
  }
}
