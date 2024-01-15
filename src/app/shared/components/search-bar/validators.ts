import { AbstractControl, ValidatorFn } from "@angular/forms";

const INVALID_USERNAMES = ['gcpglobal'];

export function invalidUsernameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value?.toLowerCase().trim();

    // Check if the username is in the list of invalid usernames
    if (INVALID_USERNAMES.includes(value)) {
      return { 'invalidUsername': { value: control.value } };
    }

    return null;
  };
}
