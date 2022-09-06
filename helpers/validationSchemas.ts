import * as Yup from 'yup'

import { differenceInYears, isFuture } from 'date-fns'

const TWO_MB_IN_BYTES = 2e6

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
})

export const PASSWORD_RECOVERY_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Insira um email válido').required('Insira um email'),
})

export const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Insira um email válido').required('Insira um email válido'),
  password: Yup.string().required('Insira uma senha'),
})

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
      (value) =>
        differenceInYears(new Date(Date.now()), new Date(value as unknown as number)) >= 16,
    ),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas devem coincidir',
  ),
})

export const DEVOTIONAL_CREATION_SCHEMA = Yup.object().shape({
  body: Yup.string()
    .min(255, 'O devocional deve ter no mínimo 255 caractéres')
    .required('Insira ou edite o devocional neste campo'),
  title: Yup.string().required('Insira um título'),
  scheduledTo: Yup.string()
    .required('Selecione uma data para publicar')
    .test('Data futura', 'A data deve ser futura', (value) =>
      isFuture(new Date(value as unknown as number)),
    ),
  author: Yup.string()
    .matches(/^[^\s]+( [^\s]+)+$/, 'Insira seu nome e sobrenome')
    .required('Insira o nome do autor'),
  coverImage: Yup.mixed()
    .required('Insira uma imagem de capa')
    .test(
      'fileSize',
      'O arquivo deve ter no máximo 2MB',
      (value) => value?.size <= TWO_MB_IN_BYTES,
    ),
})
export const NEWS_CREATION_SCHEMA = Yup.object().shape({
  body: Yup.string()
    .min(255, 'A notícia deve ter no mínimo 255 caractéres')
    .required('Insira ou edite a notícia neste campo'),
  highlightText: Yup.string()
    .max(255, 'O destaque deve ter no máximo 255 caractéres')
    .required('Insira ou edite o destaque da notícia neste campo'),
  title: Yup.string().required('Insira um título'),
  scheduledTo: Yup.string()
    .required('Selecione uma data para publicar')
    .test('Data futura', 'A data deve ser futura', (value) =>
      isFuture(new Date(value as unknown as number)),
    ),
  coverImage: Yup.mixed()
    .required('Insira uma imagem de capa')
    .test(
      'fileSize',
      'O arquivo deve ter no máximo 2MB',
      (value) => value?.size <= TWO_MB_IN_BYTES,
    ),
})

export const EVENT_SUBSCRIPTION_SCHEMA = Yup.object().shape({
  userEmail: Yup.string().email('Insira um email válido').required('Insira um email'),
  userName: Yup.string()
    .matches(/^[^\s]+( [^\s]+)+$/, 'Insira seu nome e sobrenome')
    .required('Insira seu nome e sobrenome'),
  userPhone: Yup.string()
    .matches(/^\+[0-9]{2}\s[0-9]{1,2}\s[0-9]{1,2}\s[0-9]{4}\-[0-9]{4}/, 'Insira um formato válido')
    .required('Insira seu telefone'),
})
