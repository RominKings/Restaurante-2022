import React, { useState, useEffect, createContext } from "react";
import { setToken, getToken, removeToken } from "../api/token";
import { useUser } from "../hooks";

//SISTEMA QUE SE ENCARGA DE LOGEAR EL SISTEMA DE AUTENTICACION
export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

//SISTEMA DE AUTENTICACION
export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);
  const { getMe } = useUser();

//PARA QUE AL RECARGA UNA APGINA SIGA ESTANDO EN LA SESION QUE SE HABIA INIADO
useEffect(() => {
  (async function () {
    const token = getToken();
    if (token) {
      const me = await getMe(token);
      setAuth({ token, me });
    } else {
      setAuth(null);
    }
  })();
}, [setAuth]);

//CON ESTO CADA VEZ QUE SE HAGA UN LOGIN SE RELLENA EL AUTH CON EL TOKEN
  const login = async (token) => {
    setToken(token);
    const me = await getMe(token);
    setAuth({ token, me });
  };


//PARA PODER CERRAR SESION
  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
    }
  };

  const valueContext = {
    auth,
    login,
    logout,
  };

//PARA QUE NO SE VEA UN CUADRADO FEO AL RECARGAR LA PAGINA
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}