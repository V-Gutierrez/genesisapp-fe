import Axios from 'services/axios';

export const REQUEST_RESET_PASSWORD = async (values: ForgotPasswordFormValues) => {
  await Axios.post<{ error: string }>('/auth/reset-password', {
    email: values.email,
  });
};

export const LOGIN = async (values: LoginFormValues) => {
  await Axios.post('/auth', {
    email: values.email,
    password: values.password,
  });
};

export const SIGN_UP = async (values: SignUpFormValues) => {
  await Axios.post<{ error: string }>('/users', {
    email: values.email,
    password: values.password,
    name: values.name,
    phone: values.phone,
    birthdate: values.birthdate,
  });
};

export const ACTIVATE = async (token: string) => {
  await Axios.post(
    '/auth/activate',
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  );
};

export const RESET_PASSWORD = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
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
);

export const LOGOUT = async () => {
  await Axios.delete('/auth');
};

export const CREATE_DEVOTIONAL = async (values: DevotionalFormValues) => {
  await Axios.post('/devotionals', {
    body: values.body,
    title: values.title,
    scheduledTo: values.scheduledTo,
    author: values.author,
  });
};

export const DELETE_DEVOTIONAL = async (id: string) => {
  await Axios.delete(`/devotionals/${id}`);
};
