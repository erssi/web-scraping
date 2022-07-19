export const formValidation: any = {
  role: [
    {
      required: true,
      message: 'Please choose an account type',
    },
  ],
  email: [
    {
      type: 'email',
      message: 'Email address is not valid',
    },
    {
      whitespace: true,
      message: 'Email Address is required',
    },
    {
      required: true,
      message: 'Please enter your email address',
    },
  ],
  name: [
    {
      required: true,
      message: 'Please enter your full name',
    },
    {
      min: 3,
      message: 'Minimum allowed is 3 characters',
    },
    {
      max: 100,
      message: 'maximum allowed is 100 characters',
    },
  ],
  password: [
    {
      required: true,
      message: 'Please enter your password',
    },
    {
      min: 6,
      message: 'Minimum allowed is 6 characters',
    },
    {
      max: 20,
      message: 'Maximum allowed is 20 characters',
    },
    {
      pattern:
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[-+_!@#$%^&*.,?]).+$/gm,
      message:
        'Password must contain at least one uppercase, one lowercase, one number and one special character',
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Please confirm your password',
    },
  ],
  termsAndAgreements: [
    {
      validator: (_: any, value: any) =>
        value
          ? Promise.resolve()
          : Promise.reject(
              new Error('You have to agree with the Terms and Conditions!')
            ),
    },
  ],
  topics: [
    {
      type: 'array',
      required: true,
      min: 3,
      message: 'Please choose at least 3 interests',
    },
  ],
};
