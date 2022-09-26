import { TOKEN } from "../utils/constants";

export function setToken(token) {
    localStorage.setItem(TOKEN, token);
  }

//OBTIENE EL TOKEN-------------------
export function getToken() {
    return localStorage.getItem(TOKEN);
  }

//CIERRA SESION------------
export function removeToken() {
    localStorage.removeItem(TOKEN);
  }