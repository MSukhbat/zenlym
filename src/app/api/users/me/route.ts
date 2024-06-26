import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { authUser } from "@/service/user-service";

export const GET = withApiAuthRequired(async function myApiRoute(req) {
  const res = new NextResponse();
  const { user }: any = await getSession(req, res);
  if (!user)
    return NextResponse.json(
      { error: "User not authorized!" },
      { status: 401 }
    );
  const { email, name, picture: image } = user;
  const { response } = await authUser(email, name, image);
  return NextResponse.json({ response }, res);
});
