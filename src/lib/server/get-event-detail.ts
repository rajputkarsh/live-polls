import "server-only";

import { Event, User } from "@prisma/client";
import { cache } from "react";
import { prisma } from "../prisma/client";
import { eventDetail } from "../prisma/validators/event-validators";

type Params = {
  ownerId: User["id"];
  eventSlug: Event["slug"];
};

export const getEventDetail = cache(async ({ eventSlug, ownerId }: Params) => {
  const data = await prisma.event.findFirst({
    where: {
      slug: eventSlug,
      ownerId: ownerId,
    },
    ...eventDetail,
  });

  return data;
});
