import { environment } from '../../environments/environment';

const BASE_API_URL = environment.apiUrl;

export const apiUrls = {
  BASE_API_URL,
  AUTH: `${BASE_API_URL}/login`,
  VALIDATE_CODE: `${BASE_API_URL}/validate-code/`,
  REGISTER: `${BASE_API_URL}/register`,
  GET_CANVAS: `${BASE_API_URL}/canvas`,
  GET_CANVAS_ID: `${BASE_API_URL}/canvas/`,
  EDIT_CANVAS: `${BASE_API_URL}/canvas/`,
  POST_CANVAS: `${BASE_API_URL}/canvas`,
  DELETE_CANVAS: `${BASE_API_URL}/canvas/`
};
