const baseUrl = 'http://localhost:3000';

export const environment = {
  production: true,
  urlAddress: baseUrl,
  endPoints: {
    auth: { signIn: `${baseUrl}/signIn` },
    employee: {
      createEmployee: `${baseUrl}/path/to/create`,
      loginEmoployee: `${baseUrl}/login`,
    },
  },
};
