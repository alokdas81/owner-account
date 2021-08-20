
const baseUrl = 'http://projectsshowcase.com:9000/api';


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
