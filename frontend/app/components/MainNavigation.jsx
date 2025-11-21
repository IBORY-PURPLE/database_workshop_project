import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

export default function MainNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <>
      <NavLink
        to=""
        className="mt-6 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600"
      >
        Home
      </NavLink>
      {!token && (
        <NavLink
          to="/auth?mode=login"
          className="mt-6 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600"
        >
          longin
        </NavLink>
      )}
      {token && (
        <Form action="/logout" method="post" style={{ display: "inline" }}>
          <button>Logout</button>
        </Form>
      )}
    </>
  );
}
