import { Token } from "@/types";
import jwtDecode from "jwt-decode";

const setTokenInLocalStorage = (accessToken: string) => {
  localStorage.setItem("token", accessToken);
};

const getTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem("token");
  return accessToken;
};

const isValidToken = (accessToken: string) => {
  const decodedToken: any = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const getUserFromLocalToken = () => {
  const accessToken = getTokenFromLocalStorage();
  if (!accessToken) return null;
  const isValid = isValidToken(accessToken);
  if (!isValid) return null;
  return jwtDecode(accessToken) as Token;
};

export {
  setTokenInLocalStorage,
  getTokenFromLocalStorage,
  isValidToken,
  getUserFromLocalToken,
};
