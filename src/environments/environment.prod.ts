
const baseUrl = 'http://localhost:3000';

export const environment = {
  production: false,
  urlAddress: baseUrl,
  endPoints: {
    auth:{master:`${baseUrl}/masterlogin`},
    Supervisor:{suplogin:`${baseUrl}/suplogin`},
    employee: {
      createEmployee: `${baseUrl}/path/to/create`,
      loginEmoployee: `${baseUrl}/login`,
    },
  },
};