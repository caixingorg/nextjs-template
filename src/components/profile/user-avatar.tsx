import { User } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  user: Pick<User, "name" | "image">
}

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Avatar className="h-16 w-16">
      {user.image ? (
        <AvatarImage alt={user.name ?? ""} src={user.image} />
      ) : (
        <AvatarFallback>
          {user.name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  )
}