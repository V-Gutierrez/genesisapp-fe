interface ForgotPasswordFormValues {
  email: string
}

interface LoginFormValues {
  email: string
  password: string
}

interface EventSubscriptionFormValues {
  userName: string
  userPhone: string
  userEmail: string
  region: string
}
interface SignUpFormValues {
  name: string
  password: string
  email: string
  phone: string
  birthdate: string
  passwordConfirmation: string
  phoneRegion: string
  region: string
}

interface ResetPasswordFormValues {
  password: string
  passwordConfirmation: string
}

interface DevotionalFormValues {
  body: string
  title: string
  scheduledTo: string
  author: string
  coverImage?: File
}
interface NewsFormValues {
  body: string
  title: string
  scheduledTo: string
  highlightText: string
  coverImage?: File
}
interface EventItemFormValues {
  coverImage?: File
  title: string
  subscriptionsScheduledTo: string
  subscriptionsDueDate: string
  eventDate: string
  maxSlots: string
  description: string
}
