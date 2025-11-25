import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("user_id");
  localStorage.removeItem("name");
  localStorage.removeItem("email");

  return redirect("/auth?mode=login");
}
