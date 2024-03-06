import { router } from "../trpc";
import { scheduleRouter } from "./schedule";
import { githubRouter } from "./github";
import { vercelRouter } from "./vercel";

export const appRouter = router({
    github: githubRouter,
    vercel: vercelRouter,
    contact: scheduleRouter
});

export type AppRouter = typeof appRouter;
