import React, { useEffect } from "react";
import Login from "../../components/Login";
import Root from "../../components/Root";
import { useStateValue } from "../../context/StateProvider";
import { fetchData } from "../../utils";

const PageRoot = () => {
  const [{ events, contestants, user }, dispatch] = useStateValue();

  useEffect(() => {
    fetchData("event", async (data) => {
      if (data.success) {
        // console.log(data.data)
        dispatch({
          type: "SET_EVENTS",
          events: data.data,
        });

        console.log("events", data.data);
        // return data.data
      } else {
        console.log(data);
      }
    });

    fetchData("contestant", async (data) => {
      if (data.success) {
        // console.log(data.data)
        dispatch({
          type: "SET_CONTESTANTS",
          contestants: data.data,
        });

        console.log("contestants", data.data);
        // return data.data
      } else {
        console.log(data);
      }
    });


  }, []);

  return <Root />
};

export default PageRoot;
