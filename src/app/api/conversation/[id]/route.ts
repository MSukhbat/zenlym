import { NextRequest, NextResponse } from "next/server";
import { getConversation } from "@/service/conversation-service";
import { getPathVariable } from "@/utils/url";
// import { uptadeConversation } from "@/service/conversation-service";
// import { deleteConversation } from "@/service/conversation-service";
import { Erica_One } from "next/font/google";

export const GET = async (request: NextRequest) => {
  const _id = getPathVariable(request, "/api/conversation/");
  const { response, error } = await getConversation(_id);
  if (error) {
    return NextResponse.json(error, { status: 404 });
  }
  return NextResponse.json(response);
};

// export const PATCH = async (request: NextRequest) => {
//   const _id = getPathVariable(request, "/api/conversation/");
//   const { members } = await request.json();

//   const uptadeData = await uptadeConversation(members, _id);

//   return NextResponse.json(uptadeData);
// };

// export const DELETE = async (request: NextRequest) => {
//   const conversationId = getPathVariable(request, "/api/conversation/");

//   const result = await deleteConversation(conversationId);
//   return NextResponse.json(result);
// };
