export type InputControl = {
  type: 'input';
  controlName: string;
  input: 'text' | 'email' | 'password' | 'checkbox';
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
}

export type SelectControl = {
  type: 'select';
  controlName: string;
  options: SelectControlOption[],
  isRequired?: boolean;
  hasDefaultValue?: boolean;
}

export type SelectControlOption = string;


export const config: ((InputControl | SelectControl) & { label: string })[] = [
  {
    type: 'input',
    controlName: 'login',
    input: 'text',
    minLength: 3,
    maxLength: 255,
    label: 'Логин ',
    isRequired: true,
  },
  {
    type: 'input',
    controlName: 'email',
    input: 'email',
    label: 'Email',
  },
  {
    type: 'input',
    controlName: 'password',
    input: 'password',
    minLength: 6,
    label: 'Пароль',
    isRequired: true,
  },
  {
    type: 'select',
    controlName: 'role',
    label: 'Роль',
    options: ['админ', 'пользователь'],
    isRequired: true,
  },
  {
    type: 'input',
    controlName: 'accept',
    input: 'checkbox',
    label: 'Согласие c правилами',
    isRequired: true,
  },

]