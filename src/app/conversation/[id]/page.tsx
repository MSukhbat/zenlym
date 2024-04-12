"use client";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "@/components/Loader";
import { useUsers } from "@/hooks/userUsers";
import { fetcher } from "@/utils/fetcher";
import { getConversationPartner } from "@/utils/get-partner";
import useSWR from "swr";

export default function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;
  const { user } = useUsers();
  const {
    data: conversation,
    isLoading: conversationLoading,
    error: conversationError,
  } = useSWR(`/api/conversation/${conversationId}`, fetcher);
  const {
    data: chats,
    isLoading,
    error,
  } = useSWR(`/api/chats/${conversationId}`, fetcher);

  if (!user || !conversation || isLoading || error) return <Loader />;
  if (!chats || conversationLoading || conversationError) return <Loader />;

  const partner = getConversationPartner(conversation, user.id);

  return (
    <div className="fixed inset-0">
      <div className="absolute left-0 right-0 top-0 flex p-4 gap-4 items-center border-b border-b-slate-300/50">
        <Link href={"/"} className="btn btn-circle btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#2c3e50"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 6l-6 6l6 6" />
          </svg>
        </Link>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <Image
              src={`${partner.imageUrl}`}
              width={48}
              height={48}
              alt={partner.name}
            />
          </div>
        </div>
        <div className="text-black text-2xl font-medium leading-snug">
          {partner.name}
        </div>
      </div>
    </div>
  );
}
