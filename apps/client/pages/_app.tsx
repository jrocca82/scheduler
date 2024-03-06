import "@total-typescript/ts-reset";
import '@splidejs/react-splide/css/core';
import { ChakraProvider } from "@chakra-ui/react";
import { trpc } from "@scheduler/lib/server/utils/trpc";
import { theme } from "@scheduler/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { useState } from "react";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
          {/* @ts-ignore */}
          <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default trpc.withTRPC(App);
