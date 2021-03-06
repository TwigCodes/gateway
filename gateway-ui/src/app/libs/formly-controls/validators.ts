import { FormlyFieldConfig, FormlyConfig } from '@ngx-formly/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { UserService, RoleService, GroupService } from '@app/admin/services';

// tslint:disable-next-line:max-line-length
export const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// tslint:disable-next-line:max-line-length
export const urlPattern = /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
export const mobilePattern = /^1[3456789]\d{9}$/;
export const usernamePattern = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/;
export const namePattern = /^(?!_)(?!.*?[ |_]$)[ #a-zA-Z0-9_\u4e00-\u9fa5-]+$/;
export const englishNamePattern = /^(?!_)(?!.*?[ |_]$)[#a-zA-Z0-9_-]+$/;
export const humanNamePattern = /^(?!.* $)[a-zA-Z ]+|[\u4e00-\u9fa5]+$/;
export const routePattern = /^\/[A-Za-z0-9/]+$/;

export const requiredValidationMessage = 'validation.require.message';
export const minValidationMessage = 'validation.min.message';
export const maxValidationMessage = 'validation.max.message';
export const minLengthValidationMessage = 'validation.min-length.message';
export const maxLengthValidationMessage = 'validation.max-length.message';
export const uniqueRoleNameValidationMessage =
  'validation.role-name.unique.message';
export const uniqueUsernameValidationMessage =
  'validation.username.unique.message';
export const uniqueGroupNameValidationMessage =
  'validation.group-name.unique.message';

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

export const routeValidationMessage = 'validation.regex.route.message';

export function routeValidator(control: FormControl): ValidationErrors {
  return routePattern.test(control.value) ? null : { route: true };
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

export const englishNameValidationMessage =
  'validation.regex.english-name.message';

export function englishNameValidator(control: FormControl): ValidationErrors {
  return englishNamePattern.test(control.value) ? null : { englishName: true };
}

export function uniqueUsernameValidationConfig(service: UserService) {
  return {
    validators: [
      {
        name: 'uniqueUsername',
        validation: (control: FormControl) => {
          return service
            .checkUniqueUsername(control.value)
            .pipe(map(isValid => (isValid ? null : { uniqueUsername: true })));
        }
      }
    ]
  };
}

export function uniqueRoleNameValidationConfig(service: RoleService) {
  return {
    validators: [
      {
        name: 'uniqueRoleName',
        validation: (control: FormControl) => {
          return service
            .checkUniqueRoleName(control.value)
            .pipe(map(isValid => (isValid ? null : { uniqueRoleName: true })));
        }
      }
    ]
  };
}

export function uniqueGroupNameValidationConfig(service: GroupService) {
  return {
    validators: [
      {
        name: 'uniqueGroupName',
        validation: (control: FormControl) => {
          return service
            .checkUniqueGroupName(control.value)
            .pipe(map(isValid => (isValid ? null : { uniqueGroupName: true })));
        }
      }
    ]
  };
}

export const COMMON_VALIDATION_MESSAGES = [
  requiredValidationMessage,
  minValidationMessage,
  maxValidationMessage,
  minLengthValidationMessage,
  maxLengthValidationMessage,
  emailValidationMessage,
  nameValidationMessage,
  urlValidationMessage,
  mobileValidationMessage,
  humanNameValidationMessage,
  usernameValidationMessage,
  englishNameValidationMessage,
  routeValidationMessage,
  uniqueRoleNameValidationMessage,
  uniqueUsernameValidationMessage,
  uniqueGroupNameValidationMessage
];

export const addValidationMessagesToConfig = (
  config: FormlyConfig,
  translate: TranslateService
) => {
  config.addValidatorMessage(
    'required',
    translate.instant(requiredValidationMessage)
  );
  config.addValidatorMessage('min', (err, field) =>
    translate.instant(minValidationMessage, {
      value: field.templateOptions.min
    })
  );
  config.addValidatorMessage('max', (err, field) =>
    translate.instant(maxValidationMessage, {
      value: field.templateOptions.max
    })
  );
  config.addValidatorMessage('minlength', (err, field) =>
    translate.instant(minLengthValidationMessage, {
      value: field.templateOptions.minlength
    })
  );
  config.addValidatorMessage('maxlength', (err, field) =>
    translate.instant(maxLengthValidationMessage, {
      value: field.templateOptions.maxLength
    })
  );
  config.addValidatorMessage(
    'email',
    translate.instant(emailValidationMessage)
  );
  config.addValidatorMessage('name', translate.instant(nameValidationMessage));
  config.addValidatorMessage(
    'username',
    translate.instant(usernameValidationMessage)
  );
  config.addValidatorMessage(
    'englishName',
    translate.instant(englishNameValidationMessage)
  );
  config.addValidatorMessage(
    'human',
    translate.instant(humanNameValidationMessage)
  );
  config.addValidatorMessage('url', translate.instant(urlValidationMessage));
  config.addValidatorMessage(
    'route',
    translate.instant(routeValidationMessage)
  );
  config.addValidatorMessage(
    'mobile',
    translate.instant(mobileValidationMessage)
  );
  config.addValidatorMessage(
    'uniqueRoleName',
    translate.instant(uniqueRoleNameValidationMessage)
  );
  config.addValidatorMessage(
    'uniqueUsername',
    translate.instant(uniqueUsernameValidationMessage)
  );
  config.addValidatorMessage(
    'uniqueGroupName',
    translate.instant(uniqueGroupNameValidationMessage)
  );
};
