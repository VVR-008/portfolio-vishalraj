import "@/styles/globals.css"; // ✅ Global styles here only
import { DM_Sans } from "next/font/google";
import type { AppProps } from "next/app";

const dmSans = DM_Sans({ display: "swap", subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={dmSans.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
