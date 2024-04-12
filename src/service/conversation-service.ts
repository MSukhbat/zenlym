import { nanoid } from "nanoid";
import { SimpleResponse } from "@/types/simple-response";
import { mongoApiRequest } from "@/utils/mongoApiRequest";
import { prisma } from "@/utils/prisma";
import { Prisma, Users, Conversation } from "@prisma/client";

export const getAllConversations = async (
  userId: string
): Promise<SimpleResponse<Conversation[]>> => {
  try {
    const response = await prisma.conversation.findMany({
      where: {
        users: { some: { userId } },
      },
      // include: {
      //   users: true,
      // },
      include: {
        users: { include: { user: true } },
      },
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

export const getConversationsByUserIds = async (userIds: string[]) => {
  try {
    const response = await prisma.conversation.findMany({
      where: {
        users: {
          some: { userId: { in: userIds } },
        },
      },
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

export const getConversation = async (id: string) => {
  try {
    const response = await prisma.conversation.findUnique({
      where: { id },
      include: { users: { include: { user: true } } },
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

export const createConversation = async (
  users: string[]
): Promise<SimpleResponse<Conversation>> => {
  try {
    const response = await prisma.conversation.create({
      data: {
        users: {
          create: [
            {
              userId: users[1],
            },
            {
              userId: users[0],
            },
          ],
        },
      },
    });
    return { response };
  } catch (error) {
    return { error };
  }
};
// export const uptadeConversation = async (
//   members: string[],
//   _id: string
// ): Promise<SimpleResponse<Conversation>> => {
//   const { response, error } = await mongoApiRequest(
//     "updateOne",
//     "conversations",
//     {
//       filter: {
//         _id,
//       },
//       update: {
//         $set: {
//           members,
//         },
//       },
//     }
//   );
//   if (error) {
//     return { error };
//   }
//   return response;
// };

// export const deleteConversation = async (
//   _id: string
// ): Promise<SimpleResponse<Conversation>> => {
//   const { response, error } = await mongoApiRequest(
//     "deleteOne",
//     "conversations",
//     {
//       filter: {
//         _id,
//       },
//     }
//   );
//   if (error) return { error };
//   return { response };
// }
// yWy6EDqTbJ0APzuR22Te0re0sSIBbBmvPMvXDvdL66ZYwchLGoRN3micrJkvQHRj
// https://us-east-1.aws.data.mongodb-api.com/app/data-ymdki/endpoint/data/v1
