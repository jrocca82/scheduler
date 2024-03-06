import { apiHandler } from "@scheduler/lib/api";
import { createContext } from "@scheduler/lib/server/context";
import { appRouter } from "@scheduler/lib/server/router/_app";
import { createNextApiHandler } from "@trpc/server/adapters/next";


export default apiHandler()
  .all(
    createNextApiHandler({
      router: appRouter,
      createContext,
    })
  );
