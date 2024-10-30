import { Model } from 'mongoose';

export type IMessage = {
  orderId: String;
  sentBy: String;
  message: String;
  isSeen: boolean;

};

export type MessageModel = Model<
  IMessage,
  Record<string, unknown>
>;

export type IMessageFilters = {
  searchTerm?: string;
};
