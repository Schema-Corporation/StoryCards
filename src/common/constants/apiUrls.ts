//const BASE_API_URL = "https://pharmaapp-services-be.com"
const BASE_API_URL = "http://192.168.1.19:3000"
export const apiUrls = {
  BASE_API_URL,
  AUTH: `${BASE_API_URL}/login`,
  VALIDATE_CODE: `${BASE_API_URL}/validate-code/`,
  REGISTER: `${BASE_API_URL}/register`
};
