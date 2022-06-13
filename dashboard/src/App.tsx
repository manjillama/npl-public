import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FullScreenLoader } from "./components/commons/Loader";
import { init } from "./slices/auth";
import { AppDispatch } from "./store";
import "./theme/global.scss";

const App = ({ children }: { children: React.ReactNode }) => {
  const [fetching, setFetching] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        await dispatch(init());
        setFetching(false);
      } else setFetching(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetching) return <FullScreenLoader />;

  return <div>{children}</div>;
};

export default App;
