import Axios from 'services/axios'

/**
 * Request password reset
 * @param {ForgotPasswordFormValues} values - The email address of the user requesting the password reset
 */
export const REQUEST_RESET_PASSWORD = async (values: ForgotPasswordFormValues) => {
  await Axios.post<{ error: string }>('/auth/reset-password', {
    email: values.email,
  })
}

/**
 * Login
 * @param {LoginFormValues} param0 - The email and password of the user logging in
 */
export const LOGIN = async ({ email, password }: LoginFormValues) => {
  await Axios.post('/auth', {
    email,
    password,
  })
}

/**
 * Sign up
 * @param {SignUpFormValues} param0 - The user's email, password, name, phone number, birthdate, and region
 */
export const SIGN_UP = async ({
  email,
  password,
  name,
  phone,
  birthdate,
  region,
}: SignUpFormValues) => {
  await Axios.post<{ error: string }>('/users', {
    email,
    password,
    name,
    phone,
    birthdate,
    region,
  })
}

/**
 * Activate account
 * @param {string} token - The activation token sent to the user's email
 */
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

/**
 * Reset password
 * @param {Object} param0 - The reset password token and the new password
 * @param {string} param0.token - The reset password token sent to the user's email
 * @param {string} param0.newPassword - The new password to set
 */
export const RESET_PASSWORD = async ({
  token,
  newPassword,
}: {
  token: string
  newPassword: string
}) => Axios.put(
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

/**
 * Logout
 */
export const LOGOUT = async () => {
  await Axios.delete('/auth/logout')
}

/**
 * Create devotional
 * @param {DevotionalFormValues} values - The details of the devotional to create
 */
export const CREATE_DEVOTIONAL = async (values: DevotionalFormValues) => {
  const formdata = new FormData()

  // Append each key-value pair to the form data
  Object.entries(values).forEach(([key, value]) => {
    formdata.append(key, value)
  })

  await Axios.post('/admin/devotionals', formdata)
}

/**
 * Create event
 * @param {EventItemFormValues} values - The details of the event to create
 */
export const CREATE_EVENT = async (values: EventItemFormValues) => {
  const formdata = new FormData()

  // Append each key-value pair to the form data
  Object.entries(values).forEach(([key, value]) => {
    formdata.append(key, value)
  })

  await Axios.post('/admin/events', formdata)
}

/**
 * Delete devotional
 * @param {string} id - The ID of the devotional to delete
 */
export const DELETE_DEVOTIONAL = async (id: string) => {
  await Axios.delete(`/admin/devotionals/${id}`)
}

/**
 * Delete event
 * @param {string} id - The ID of the event to delete
 */
export const DELETE_EVENT = async (id: string) => {
  await Axios.delete(`/admin/events/${id}`)
}

/**
 * Delete event subscription
 * @param {string} id - The ID of the event subscription to delete
 */
export const DELETE_EVENT_SUBSCRIPTION = async (id: string) => {
  await Axios.delete(`/admin/subscriptions/${id}`)
}

/**
 * Like devotional
 * @param {string} id - The ID of the devotional to like
 */
export const LIKE_DEVOTIONAL = async (id: string) => {
  await Axios.post(`/devotionals/${id}/like`)
}

/**
 * Create news
 * @param {NewsFormValues} values - The details of the news to create
 */
export const CREATE_NEWS = async (values: NewsFormValues) => {
  const formdata = new FormData()

  // Append each key-value pair to the form data
  Object.entries(values).forEach(([key, value]) => {
    formdata.append(key, value)
  })

  await Axios.post('/admin/news', formdata)
}

/**
 * Create growth group
 * @param {GrowthGroupFormValues} values - The details of the growth group to create
 */
export const CREATE_GROWTH_GROUP = async (values: GrowthGroupFormValues) => {
  await Axios.post('/admin/growthgroups', values)
}

/**
 * Delete news
 * @param {string} id - The ID of the news to delete
 */
export const DELETE_NEWS = async (id: string) => {
  await Axios.delete(`/admin/news/${id}`)
}

/**
 * Delete growth group
 * @param {string} id - The ID of the growth group to delete
 */
export const DELETE_GROWTH_GROUP = async (id: string) => {
  await Axios.delete(`/admin/growthgroups/${id}`)
}

/**
 * Like news
 * @param {string} id - The ID of the news to like
 */
export const LIKE_NEWS = async (id: string) => {
  await Axios.post(`/news/${id}/like`)
}

/**
 * Subscribe to event
 * @param {Object} param0 - The ID of the event to subscribe to and the details of the subscription
 * @param {string} param0.id - The ID of the event to subscribe to
 * @param {Partial<EventSubscriptionFormValues>} param0.values - The details of the subscription
 */
export const SUBSCRIBE_TO_EVENT = async ({
  id,
  values,
}: {
  id: string
  values: Partial<EventSubscriptionFormValues>
}) => {
  // Remove the "region" key from the values object
  delete values.region

  await Axios.post(`/events/${id}/subscriptions`, values)
}

export const LIKE_GALLERY = async (id: string) => {
  await Axios.post(`/galleries/${id}/like`)
}
