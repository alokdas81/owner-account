
const baseUrl = 'http://projectsshowcase.com:9000/api';
const base=`http://projectsshowcase.com:9000`;

export const environment = {
  production: false,
  urlAddress: baseUrl,
  baseImageUrl:base,
  endPoints: {
    auth:{master:`${baseUrl}/masterlogin`},
    Supervisor:{suplogin:`${baseUrl}/suplogin`},
    employee: {
      createEmployee: `${baseUrl}/path/to/create`,
      loginEmoployee: `${baseUrl}/login`,
    },
  },
};
