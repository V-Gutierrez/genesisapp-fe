import Axios from 'services/axios'

export const REQUEST_RESET_PASSWORD = async (values: ForgotPasswordFormValues) => {
  await Axios.post<{ error: string }>('/auth/reset-password', {
    email: values.email,
  })
}

export const LOGIN = async ({ email, password }: LoginFormValues) => {
  await Axios.post('/auth', {
    email,
    password,
  })
}

export const SIGN_UP = async ({ email, password, name, phone, birthdate }: SignUpFormValues) => {
  await Axios.post<{ error: string }>('/users', {
    email,
    password,
    name,
    phone,
    birthdate,
  })
}

export const ACTIVATE = async (token: string) => {
  await Axios.post(
    '/auth/activate',
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  )
}

export const RESET_PASSWORD = async ({
  token,
  newPassword,
}: {
  token: string
  newPassword: string
}) =>
  Axios.put(
    '/auth/reset-password',
    {
      password: newPassword,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  )

export const LOGOUT = async () => {
  await Axios.delete('/auth')
}

export const CREATE_DEVOTIONAL = async (values: DevotionalFormValues) => {
  const formdata = new FormData()

  Object.entries(values).forEach(([key, value]) => {
    formdata.append(key, value)
  })

  await Axios.post('/devotionals', formdata)
}

export const DELETE_DEVOTIONAL = async (id: string) => {
  await Axios.delete(`/devotionals/${id}`)
}

export const CREATE_EXTERNAL_EVENT = async (values: ExternalEventFormValues) => {
  const formdata = new FormData()

  Object.entries(values).forEach(([key, value]) => {
    formdata.append(key, value)
  })

  formdata.append('lat', '0')
  formdata.append('lng', '0')

  await Axios.post('/externalevents', formdata)
}

export const DELETE_EXTERNAL_EVENT = async (id: string) => {
  await Axios.delete(`/externalevents/${id}`)
}

export const LIKE_DEVOTIONAL = async (id: string) => {
  await Axios.put(`/devotionals/${id}`)
}
