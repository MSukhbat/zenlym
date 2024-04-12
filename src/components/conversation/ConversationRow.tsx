import Image from "next/image";
import Link from "next/link";
import { useUsers } from "@/hooks/userUsers";
import { Conversation } from "@/types/conversation";
import { getConversationPartner } from "@/utils/get-partner";

export const ConversationRow = ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  const { user } = useUsers();
  const partner = getConversationPartner(conversation, `${user?.id}`);

  return (
    <Link
      href={`/conversation/${conversation.id}`}
      className="px-4 flex items-center gap-4"
    >
      <div className="avatar">
        <div className="w-16 rounded-full">
          <Image
            src={`${partner.imageUrl}`}
            width={64}
            height={64}
            alt={partner.name}
          />
        </div>
      </div>
      <div className="text-black text-2xl font-medium leading-snug">
        {partner.name}
      </div>
    </Link>
  );
};
