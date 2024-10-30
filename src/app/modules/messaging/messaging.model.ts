import { Schema, model } from 'mongoose';

import { IMessage, MessageModel } from './messaging.interfaces';

const MessageSchema = new Schema<
  IMessage,
  MessageModel
>(
  {

    orderId:{
      type: Schema.Types.ObjectId,
      ref:'ClientOrder',
    },
    sentBy:{
      type: Schema.Types.ObjectId,
      ref:'UserDetails',
    },
    
    message: {
      type: String,
      required: true,
     
    },
    isSeen: {
      type: Boolean,
      
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Message = model<IMessage, MessageModel>(
  'Message',
  MessageSchema
);
