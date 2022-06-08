interface ForgotPasswordFormValues {
  email: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

interface SignUpFormValues {
  name: string;
  password: string;
  email: string;
  phone: string;
  birthdate: string;
  passwordConfirmation: string;
  region: string;
}

interface ResetPasswordFormValues {
  password: string;
  passwordConfirmation: string;
}

interface DevotionalFormValues {
  body: string;
  title: string;
  scheduledTo: string;
  author: string;
  coverImage?: File
}
interface ExternalEventFormValues {
  title: string;
  description: string;
  lng: number;
  lat: number;
  addressInfo: string;
  scheduledTo: string;
  coverImage?: File
  maxSubscriptions: number;
}
