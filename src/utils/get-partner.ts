import { Users } from "@prisma/client";
import { Conversation } from "@/types/conversation";

export const getConversationPartner = (
  conversation: Conversation,
  userId: string
) => {
  const users: Users[] = conversation.users.map((user) => user.user);
  return users?.filter((user) => user?.id !== userId)[0];
};
