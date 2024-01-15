import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { invalidUsernameValidator } from './validators';

const QUERY_MIN_LENGTH = 4;

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  @Output() public onSearch: EventEmitter<string> = new EventEmitter<string>();

  searchForm: FormGroup;
  submitted = false;

  get username(): AbstractControl<string> | null {
    return this.searchForm.get('username');
  }

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      username: ['', [
        Validators.minLength(QUERY_MIN_LENGTH),
        invalidUsernameValidator()
      ]],
    });

    // Avoid white spaces in the username input
    this.username?.valueChanges.subscribe((value) => this.username?.setValue(value.trim(), { emitEvent: false }));
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.searchForm.valid && this.username?.value) {
      this.onSearch.emit(this.username?.value);
    }
  }

}
