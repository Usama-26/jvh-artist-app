import "@/styles/globals.css";
import { Lora } from "next/font/google";
import { ReduxWrapper } from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});
function App({ Component, pageProps }) {
  return (
    <main className={`${lora.variable} font-lora`}>
      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        position={"top-center"}
      />
      <Component {...pageProps} />
    </main>
  );
}

export default ReduxWrapper.withRedux(App);
