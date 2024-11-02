import { Schema, model } from 'mongoose';

import {  IUserDetails, UserDetailsModel } from './userDetails.interface';

const UserDetailsSchema = new Schema<IUserDetails, UserDetailsModel>(
  {
   
    name: {
      type: {
        firstName: {
          type: String,
          // required: true,
        },
        lastName: {
          type: String,
          // required: true,
        },
      },
    
    },
    userName: {
      type:String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },

    contactNo: {
      type: String,
      // unique: true,
      // required: true,
    },
    profileImage: {
      type: String,
    }, 
    age: {
      type: Number,
      required: true,
    },   
  },
  {
    timestamps: true,
  }
);

export const UserDetails = model<IUserDetails, UserDetailsModel>('UserDetails', UserDetailsSchema);



