import "../styles/globals.css";
import { StateProvider } from "../context/StateProvider";
import { initialState } from "../context/initialState";
import reducer from "../context/reducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //Global styles for toastify
import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider StateProvider initialState={initialState} reducer={reducer}>
      <ToastContainer pauseOnFocusLoss={false} /> 
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
