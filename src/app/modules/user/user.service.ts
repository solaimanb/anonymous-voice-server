import { create } from "domain";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import mongoose, { SortOrder } from "mongoose";
import multer from "multer";
import { scheduler } from "timers/promises";

import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { sendEmail } from "../../../shared/mailNotification";
import config, { NEXT_CLIENT_URL } from "../../../config";
import { IMentor } from "../mentor/mentor.interface";
import { Mentor } from "../mentor/mentor.model";
import { MentorSchedule } from "../mentor/mentorSchedule.model";
import { UserDetails } from "../userDetails/userDetails.model";
import { IAdmin, IMentee, IUser, IUserFilters } from "./user.interface";
import { User } from "./user.model";

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  // set role
  user.role = "admin";

  let newUserAllData: any = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newAdmin = await UserDetails.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty ");
    }

    user.userDetails = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "userDetails",
    });
  }

  return newUserAllData;
};
const createMentor = async (
  mentor: IMentor,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  // set role
  user.role = "mentor";

  let newUserAllData: any = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const defaultSchedule: any = {
      userName: user.userName,
      schedule: [
        { time: "1:00 PM - 2:00PM ", isAvailable: false },
        { time: "2:00 PM", isAvailable: false },
      ],
    };

    const newMentorSchedule = await MentorSchedule.create([defaultSchedule], {
      session,
    });
    if (!newMentorSchedule.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to create mentor shedule"
      );
    }
    mentor.scheduleId = newMentorSchedule[0]._id;
    const newMentor = await Mentor.create([mentor], { session });

    if (!newMentor.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create mentor ");
    }

    user.userDetails = newMentor[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create mentor");
    }
    newUserAllData = newUser[0];
    const token = jwtHelpers.createToken(
      { userId: user.id, email: user.email },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    console.log("token", token);

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "userDetails",
    });
  }

  return newUserAllData;
};
const isUsernameDuplicate = async (userName: string): Promise<IUser | null> => {
  // If password is not given,set default password

  return;
};
const createMentee = async (
  mentee: IMentee,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  // set role
  user.role = "mentee";

  let newUserAllData: any = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newMentee = await UserDetails.create([mentee], { session });

    if (!newMentee.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create mentee ");
    }

    user.userDetails = newMentee[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create mentee");
    }
    newUserAllData = newUser[0];
    const token = jwtHelpers.createToken(
      { userId: user.id, email: user.email },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    // config.jwt.expires_in as string
    console.log("token", token);

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "userDetails",
    });
  }

  return newUserAllData;
};
const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: any = [];

  // Search needs $or for searching in specified fields
  // if (searchTerm) {
  //   andConditions.push({
  //     $or: academicFacultySearchableFields.map(field => ({
  //       [field]: {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     })),
  //   });
  // }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  console.log(whereConditions);
  const result = await User.find(whereConditions)
    .populate("userDetails")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateUserInformation = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// const imageUpload = async (req:any,res:any): Promise<any> => {

// return new Promise((resolve,reject)=>{

//   const storage = multer.diskStorage({
//     destination:'./uploads/misc',
//     filename: function(req, file, cb) {
//       console.log('file',file)

//       cb(null, file.originalname);
//     }
//   })

//   const upload = multer({ storage: storage }).single('file');

//      upload(req, res, (err)=> {
//        if (err ){
//         console.log('UPLOAD ERR--->',err);
//         res.json({ uploaded: false, error: 'Upload failed' });

//       }
//       else {
//         console.log('else eecuted')
//       //    const newImage = new ImageUpload({
//       //     name: 'image',
//       //     image:{
//       //       data: 'this is file name',
//       //       contentType: 'image/png'
//       //     }
//       // })

//       // newImage.save().then((result:any)=>{
//       //   console.log(result);
//       // }).catch((err:any)=>{
//       //   console.log(err);
//       // } );
//        console.log('else eecuted')  };

//        const fileName = req.file.filename;
//        resolve ({"uploaded": true,
//        "url":`http://localhost:5000/misc/${fileName}`,
//        "fileName":fileName});

//     });
// })

// };
export const UserService = {
  createAdmin,
  createMentor,
  createMentee,
  getAllUsers,
  updateUserInformation,
  isUsernameDuplicate,
  // imageUpload
};
