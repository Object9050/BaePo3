// On setToken, grab the data from the fetch API request
// and put id, username, jwt in a cookie. If login credentials fit
// reload the page. On logout, remove the cookie and reload page.
import Router from "next/router";
import Cookies from "js-cookie";

export const setToken = (data) => {
  // return nothing when data.user is undefined which happens
  // when user login-data is incorrect
  if (typeof window === "undefined" || !data.user) {
    return;
  }
  
  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("jwt", data.jwt);

  if (Cookies.get("username")) {
    try {
      Router.reload("/");
    } catch (error) {
      console.error("Fehler beim Neuladen der Seite:", error);
    }
  }
};

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("username");
  Cookies.remove("jwt");

  Router.reload("/");
};

export const getUserFromLocalCookie = () => {
  return Cookies.get("username");
};

export const getIdFromLocalCookie = () => {
  return Cookies.get("id");
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};

export const getTokenFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const jwtCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwt;
};

export const getIdFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const idCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("id="));
  if (!idCookie) {
    return undefined;
  }
  const id = idCookie.split("=")[1];
  return id;
};
