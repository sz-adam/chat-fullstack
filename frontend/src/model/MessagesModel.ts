import { User } from "./UserModel";

export interface Message {
  id: number;
  senderId: number;
  sender: User;
  receiverId: number;
  receiver: User;
  text: string;
  createdAt: string;
  updatedAt: string;
}
