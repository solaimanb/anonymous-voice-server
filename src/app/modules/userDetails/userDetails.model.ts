import { Schema, model } from 'mongoose';

import { IPermission, IUserDetails, UserDetailsModel } from './userDetails.interface';

const PermissionSchema = new Schema<IPermission>(
  {

    id: {
      type: String,
      required: true,
    },
    featureName: {
      type: String,
      required: true,
    },
    view: {
      type: Boolean,
      required: true,
    },
    add: {
      type: Boolean,
      required: true,
    },
    edit: {
      type: Boolean,
      required: true,
    },
    delete: {
      type: Boolean,
      required: true,
    },
  },
  {
    _id: false,
  }
);
const UserDetailsSchema = new Schema<IUserDetails, UserDetailsModel>(
  {
   
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    
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
    },

    contactNo: {
      type: String,
      // unique: true,
      // required: true,
    },
 
    website: {
      type: String,
      // required: true,
    },

 
    profileImage: {
      type: String,
    }, 
    permissions: {
      type: [PermissionSchema],
      default: [],
    }
    
  },
  

  {
    timestamps: true,
  }
);

export const UserDetails = model<IUserDetails, UserDetailsModel>('UserDetails', UserDetailsSchema);



// const permissions = [
//   { name: 'make_order', view: true, add: true, edit: true, delete: true },
//   { name: 'invoice', view: true, add: false, edit: false, delete: false },
//   { name: 'message', view: true, add: false, edit: false, delete: false },
//   // Add more permission objects as needed
// ];