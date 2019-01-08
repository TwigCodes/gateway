import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl, ValidationErrors } from '@angular/forms';

// tslint:disable-next-line:max-line-length
export const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// tslint:disable-next-line:max-line-length
export const urlPattern = /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
export const mobilePattern = /^1[3456789]\d{9}$/;
export const usernamePattern = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/;
export const namePattern = /^(?!_)(?!.*?[ |_]$)[ #a-zA-Z0-9_\u4e00-\u9fa5-]+$/;
export const humanNamePattern = /^(?!.* $)[a-zA-Z ]+|[\u4e00-\u9fa5]+$/;

export const requiredValidationMessage = 'validation.require.message';
export const minValidationMessage = 'validation.min.message';
export const maxValidationMessage = 'validation.max.message';
export const minLengthValidationMessage = 'validation.min-length.message';
export const maxLengthValidationMessage = 'validation.max-length.message';

export const emailValidationMessage = 'validation.regex.email.message';

export function emailValidator(control: FormControl): ValidationErrors {
  return emailPattern.test(control.value) ? null : { email: true };
}

export const nameValidationMessage = 'validation.regex.name.message';

export function nameValidator(control: FormControl): ValidationErrors {
  return namePattern.test(control.value) ? null : { name: true };
}

export const urlValidationMessage = 'validation.regex.url.message';

export function urlValidator(control: FormControl): ValidationErrors {
  return urlPattern.test(control.value) ? null : { url: true };
}

export const mobileValidationMessage = 'validation.regex.mobile.message';

export function mobileValidator(control: FormControl): ValidationErrors {
  return mobilePattern.test(control.value) ? null : { mobile: true };
}

export const humanNameValidationMessage = 'validation.regex.human-name.message';

export function humanNameValidator(control: FormControl): ValidationErrors {
  return humanNamePattern.test(control.value) ? null : { humanName: true };
}

export const usernameValidationMessage = 'validation.regex.username.message';

export function usernameValidator(control: FormControl): ValidationErrors {
  return usernamePattern.test(control.value) ? null : { username: true };
}
