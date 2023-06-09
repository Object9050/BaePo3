// When setting token, grab the data from the fetch API request 
// and put id, username, jwt in cookies. If login credentials fit
// reload the page. On logout, remove the cookies and reload page.
export const setToken = (data) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("jwt", data.jwt);

  if (Cookies.get("username")) {
    Router.reload("/");
  }
};

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id", data.user.id);
  Cookies.remove("username", data.user.username);
  Cookies.remove("jwt", data.jwt);
};
