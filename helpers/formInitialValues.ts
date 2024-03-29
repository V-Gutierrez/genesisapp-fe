export const FORGOT_PASSWORD_INITIAL_VALUES = {
  email: '',
}

export const LOGIN_INITIAL_VALUES = { email: '', password: '' }

export const SIGNUP_INITIAL_VALUES = {
  name: '',
  password: '',
  email: '',
  phone: '',
  birthdate: '',
  passwordConfirmation: '',
  phoneRegion: '+54',
  region: '',
}

export const RESET_PASSWORD_INITIAL_VALUES = {
  password: '',
  passwordConfirmation: '',
}

export const DEVOTIONAL_CREATION_INITIAL_VALUES = {
  body: '',
  title: '',
  scheduledTo: '',
  author: '',
}
export const NEWS_CREATION_INITIAL_VALUES = {
  body: '',
  title: '',
  scheduledTo: '',
  highlightText: '',
  isHighlight: false,
}

export const EVENT_CREATION_INITIAL_VALUES = {
  title: '',
  subscriptionsScheduledTo: '',
  subscriptionsDueDate: '',
  eventDate: '',
  maxSlots: '',
  description: '',
}

export const SUBSCRIPTION_INITIAL_VALUES = {
  userName: '',
  userEmail: '',
  userPhone: '',
  region: '+54',
}

export const GROWTH_GROUP_INITIAL_VALUES = {
  name: '',
  whatsappLink: '',
  addressInfo: '',
  weekDay: 'Segunda-feira' as WeekDay,
  scheduledTime: '08:00',
  leadership: '' as string[] | string,
}
