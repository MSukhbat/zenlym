import { Prisma } from "@prisma/client";

export type Chat = Prisma.ChatGetPayload<{
  include: { sender: true };
}>;
