import "server-only";

import { prisma } from "../prisma/client";

export const getUserInfo = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      _count: {
        select: {
          events: true,
          questions: true,
          participations: true,
          bookmarks: true,
        },
      },
    },
  });
};
