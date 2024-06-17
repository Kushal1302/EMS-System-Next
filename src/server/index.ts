import { userRouter } from "./routers/user";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getUserName: publicProcedure.query(() => {
    return {
      name: "Kushal",
      type: "Owner",
    };
  }),
  user:userRouter
});

export type AppRouter = typeof appRouter;
