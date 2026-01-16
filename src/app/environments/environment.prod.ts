import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyCv616M1k7lQlhniimarKbSJakRe3ryAMU",
    authDomain: "rehab-octoper.firebaseapp.com",
    projectId: "rehab-octoper",
    storageBucket: "rehab-octoper.firebasestorage.app",
    messagingSenderId: "821864131343",
    appId: "1:821864131343:web:f1673a4b500f8486326c7a"
  },
  vapidKey: "BCEwJkl_rYfvBZuN_Hh0XUJ8IHGgddm97C9qwy72QwF1SvZ70N-GLreoCNBPUVPhiR3qm5gvRIRJm8Ih5M_L8dc",
  // TODO: Replace with production API URL before deployment
  baseUrl: "https://your-production-api.com/api/"
};