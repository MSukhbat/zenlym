import { Prisma } from "@prisma/client";

export type Conversation = Prisma.ConversationGetPayload<{
  include: { users: { include: { user: true } } };
}>;
