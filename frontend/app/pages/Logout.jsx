import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("user_id");

  return redirect("/auth?mode=login");
}
