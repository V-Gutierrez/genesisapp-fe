import * as Yup from 'yup';

import { differenceInYears, isFuture } from 'date-fns';

export const RESET_PASSWORD_SCHEMA = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Sua senha deve ter no mínimo 8 caractéres')
    .matches(/[a-z]/, 'Sua senha deve conter letras minúsculas')
    .matches(/[A-Z]/, 'Sua senha deve conter letras maiúsculas')
    .matches(/[0-9]/, 'Sua senha deve conter números')
    .matches(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'Sua senha deve conter caracteres especiais')
    .required('Insira uma senha'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas devem coincidir',
  ),
});

export const PASSWORD_RECOVERY_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Insira um email válido').required('Insira um email'),
});

export const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Insira um email válido').required('Insira um email válido'),
  password: Yup.string().required('Insira uma senha'),
});

export const SIGNUP_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Insira um email válido').required('Insira um email'),
  password: Yup.string()
    .min(8, 'Sua senha deve ter no mínimo 8 caractéres')
    .matches(/[a-z]/, 'Sua senha deve conter letras minúsculas')
    .matches(/[A-Z]/, 'Sua senha deve conter letras maiúsculas')
    .matches(/[0-9]/, 'Sua senha deve conter números')
    .matches(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'Sua senha deve conter caracteres especiais')
    .required('Insira uma senha'),
  name: Yup.string()
    .matches(/^[^\s]+( [^\s]+)+$/, 'Insira seu nome e sobrenome')
    .required('Insira seu nome e sobrenome'),
  phone: Yup.string()
    .matches(/^\+[0-9]{2}\s[0-9]{1,2}\s[0-9]{1,2}\s[0-9]{4}\-[0-9]{4}/, 'Insira um formato válido')
    .required('Insira seu telefone'),
  birthdate: Yup.string()
    .required('Selecione uma data de nascimento')
    .test(
      'Idade é maior que 18',
      'Você precisa ter mais de 18 anos para criar uma conta',
      (value) => differenceInYears(new Date(Date.now()), new Date(value as unknown as number)) >= 16,
    ),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas devem coincidir',
  ),
});

export const DEVOTIONAL_CREATION_SCHEMA = Yup.object().shape({
  body: Yup.string()
    .min(255, 'O devocional deve ter no mínimo 255 caractéres')
    .required('Insira ou edite o devocional neste campo'),
  title: Yup.string().required('Insira um título'),
  scheduledTo: Yup.string()
    .test('Data futura', 'A data deve ser futura', (value) => isFuture(new Date(value as unknown as number)))
    .required('Selecione uma data para publicar'),
});
