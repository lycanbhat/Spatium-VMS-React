import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

// import { store } from "./redux/store";
import { useSelector } from "react-redux";

import Layoutset from "./components/layoutset";

function App() {
  const { tokens } = useSelector((state) => state.auth);
  // const authcheck = async () => {
  //   if (!Object.keys(tokens).length) {
  //     return redirect("/login");
  //   }
  //   return null;
  // };
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     loader: () => {
  //       return redirect("analytics/");
  //     },
  //   },
  //   {
  //     path: "/analytics",
  //     element: <Analytics />,
  //     // loader:authcheck,
  //     errorElement: (
  //       <div className="text-center mt-4">Something went wrong</div>
  //     ),
  //   },
  //   {
  //     path: "/members",
  //     element: <Members />,
  //   },
  // ]);

  return (
    <>
      <BrowserRouter>
        <Layoutset />
      </BrowserRouter>
    </>
  );
}

export default App;
