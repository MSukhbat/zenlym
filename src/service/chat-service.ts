import { SimpleResponse } from "@/types/simple-response";
import { Chat } from "@prisma/client";
import { prisma } from "@/utils/prisma";

export const getChatsByConversationById = async (
  conversationId: string
): Promise<SimpleResponse<Chat[]>> => {
  try {
    const response = await prisma.chat.findMany({ where: { conversationId } });
    return { response };
  } catch (error) {
    return { error };
  }
};

export const sendChat = async (
  conversationId: string,
  senderId: string,
  content: string
): Promise<SimpleResponse<Chat>> => {
  try {
    const response = await prisma.chat.create({
      data: {
        conversationId,
        senderId,
        content,
      },
    });
    return { response };
  } catch (error) {
    return { error };
  }
};
