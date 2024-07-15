export enum RegistrationFormFields {
  USERNAME,
  PASSWORD,
  CONFIRM_PASSWORD,
}

export type RegistrationForm = {
  username: string
  password: string
  confirmPassword: string
}

export function validateRegistrationForm(
  form: RegistrationForm,
): boolean | RegistrationFormFields {
  const passwordLength = 6
  const usernameLength = 3

  if (form.username.length < usernameLength || form.username.includes(' ')) {
    return RegistrationFormFields.USERNAME
  }

  if (form.password.length < passwordLength || form.password.includes(' ')) {
    return RegistrationFormFields.PASSWORD
  }

  if (form.password !== form.confirmPassword) {
    return RegistrationFormFields.CONFIRM_PASSWORD
  }

  return true
}
