import { UserContextProvider } from "@/context/UserContext";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <NextUIProvider>
        <SnackbarProvider
          iconVariant={{
            success: "✅",
            error: "❌",
            warning: "🚧",
            info: "ℹ️",
          }}
        >
          <Component {...pageProps} />
        </SnackbarProvider>
      </NextUIProvider>
    </UserContextProvider>
  );
}
