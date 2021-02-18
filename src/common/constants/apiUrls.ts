import { environment } from '../../environments/environment';

const BASE_API_URL = environment.apiUrl;
const WS_API_URL = environment.wsServer;

export const apiUrls = {
  BASE_API_URL,
  AUTH: `${BASE_API_URL}/login`,
  VALIDATE_CODE: `${BASE_API_URL}/validate-code/`,
  REGISTER: `${BASE_API_URL}/register`,
  GET_CANVAS: `${BASE_API_URL}/canvas`,
  GET_CANVAS_ID: `${BASE_API_URL}/canvas/`,
  EDIT_CANVAS: `${BASE_API_URL}/canvas/`,
  POST_CANVAS: `${BASE_API_URL}/canvas`,
  DELETE_CANVAS: `${BASE_API_URL}/canvas/`,
  GET_ROOM: `${BASE_API_URL}/room`,
  GET_ROOM_ID: `${BASE_API_URL}/room/detail/`,
  POST_ROOM: `${BASE_API_URL}/room`,
  DELETE_ROOM: `${BASE_API_URL}/room/`,
  VALIDATE_ROOM_CODE: `${BASE_API_URL}/room/validate-code`,
  POST_GUEST: `${BASE_API_URL}/room/add-guest`,
  VALIDATE_ROLE: `${BASE_API_URL}/validate-role`,
  GET_GUEST_FROM_ROOM: `${BASE_API_URL}/room/guests/`,
  WS_GET_GUEST_FROM_ROOM: `${WS_API_URL}/room/guests/`,
  PUT_GUEST_WAITING_ROOM: `${BASE_API_URL}/room/guests/`
};
