import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUserDetails = {
  id: string;
  userName: string;
  age:number;
  name?: UserName;
  profileImage?: string;
  dateOfBirth?: string;
  email?: string;
  contactNo?: string;
  gender: 'male' | 'female';

  
};

export type UserDetailsModel = Model<IUserDetails, Record<string, unknown>>;

export type IUserDetailsFilters = {
  searchTerm?: string;
  userName?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment?: string;
  designation?: string;

};

