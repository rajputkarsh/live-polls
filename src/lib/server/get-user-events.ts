import "server-only";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Event } from "@prisma/client";
import { cache } from "react";
import { prisma } from "../prisma/client";
import { eventDetail } from "../prisma/validators/event-validators";
import { redirect } from "next/navigation";

type Params = {
  cursor?: Event["id"];
};

export const getUserEvents = cache(async ({ cursor }: Params = {}) => {
  const user = await getKindeServerSession().getUser();

  if (!user || !user.id) {
      redirect("/api/auth/login");
  }

  return await prisma.event.findMany({
    where: {
      ownerId: user.id,
    },
    take: 20,
    skip: cursor ? 1 : 0,
    ...(cursor ? { cursor: { id: cursor } } : {}),
    orderBy: {
      createdAt: "desc",
    },
  });
});
