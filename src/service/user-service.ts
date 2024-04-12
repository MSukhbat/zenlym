import { nanoid } from "nanoid";
import { mongoApiRequest } from "@/utils/mongoApiRequest";
import { prisma } from "@/utils/prisma";
import { Prisma, Users } from "@prisma/client";

export const authUser = async (
  email: string,
  name: string,
  imageUrl?: string
): Promise<{ response?: Users; error?: unknown }> => {
  const { response: existingUser, error: findError } = await getUserByEmail(
    email
  );
  if (findError) return { error: findError };
  if (existingUser) return { response: existingUser };
  console.log("user not exists");
  const { response, error } = await createUser({ email, name, imageUrl });
  if (error) return { error };
  return { response };
};

export const getUserByEmail = async (email: string) => {
  try {
    const response = await prisma.users.findUnique({ where: { email } });
    return { response: response };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const createUser = async (input: Prisma.UsersCreateInput) => {
  try {
    const result = await prisma.users.create({ data: input });
    return { response: result };
  } catch (error) {
    return { error };
  }
};

export const getAllUsers = async (filter?: Prisma.UsersWhereInput) => {
  try {
    const result = await prisma.users.findMany({ where: filter });
    return { response: result };
  } catch (error) {
    return { error };
  }
};
