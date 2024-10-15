import "server-only";

import { Event, User } from "@prisma/client";
import { cache } from "react";
import { prisma } from "../prisma/client";

type Params = {
  ownerId: User["id"];
  eventSlug: Event["slug"];
};

export const getEventDetail = cache(async ({ eventSlug, ownerId }: Params) => {
  return await prisma.event.findFirst({
    where: {
      slug: eventSlug,
      ownerId: ownerId,
    },
  });
});
