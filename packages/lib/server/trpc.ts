import { initTRPC, TRPCError } from "@trpc/server";
import SuperJSON from "superjson";
import { TRPCPanelMeta } from "trpc-panel";
import { Context } from "./context";
import jwt from "jsonwebtoken";
import { MagicUserMetadata } from "@magic-sdk/admin";

const t = initTRPC.context<Context>().meta<TRPCPanelMeta>().create({
  transformer: SuperJSON,
});

const isAuthenticated = t.middleware(async (opts) => {
  const { ctx, next, } = opts;

  try {
    if (!ctx.authorization) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    let isValid = jwt.verify(ctx.authorization, process.env.JWT_SECRET as string);

    if (!isValid) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const user = jwt.decode(ctx.authorization) as unknown as MagicUserMetadata;

    return next({
      ctx: {
        user
      }
    })
  } catch (error) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
})


export const { router } = t;
export const protectedProcedure = t.procedure.use(isAuthenticated);
// export const adminProcedure = t.procedure.use(isAdmin);
export const publicProcedure = t.procedure;
