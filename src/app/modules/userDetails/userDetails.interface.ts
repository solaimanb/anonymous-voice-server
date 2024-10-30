import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUserDetails = {
  id: string;
  name: UserName;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;

  gender?: 'male' | 'female';
  website?: string;
  permissions: { [key: string]: { view: boolean; add: boolean; edit: boolean; delete: boolean } };
  
};

export type UserDetailsModel = Model<IUserDetails, Record<string, unknown>>;

export type IUserDetailsFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment?: string;
  designation?: string;
  permissions: IPermission[];
};


export type IPermission= {
  id: string;
  featureName: string;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
}