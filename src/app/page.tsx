"use client";

import Image from "next/image";
import { Loader } from "@/components/Loader";
import { ConversationRow } from "@/components/conversation/ConversationRow";
import { useUsers } from "@/hooks/userUsers";
import { Conversation } from "@/types/conversation";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function Home() {
  const { user } = useUsers();
  const { data, isLoading, error } = useSWR("/api/conversation/", fetcher);
  if (!user || isLoading || error) return <Loader />;

  return (
    <div className="bg-blue">
      <div className="flex justify-between py-3 px-4 ">
        <div className=" flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <Image
                src={`${user.imageUrl}`}
                width={40}
                height={40}
                alt={user.name}
              />
            </div>
          </div>
          <div className="text-3xl font-bold">Chats</div>
        </div>
        <div>
          <button className="btn btn-circle">
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
              <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
              <path d="M13.5 6.5l4 4" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search"
          className="input w-full input-bordered"
        />
      </div>
      <div>
        {data &&
          data.map((conversation: Conversation) => {
            return (
              <ConversationRow
                key={conversation.id}
                conversation={conversation}
              />
            );
          })}
      </div>
    </div>
  );
}
