import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './user.constant';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
   
    const result = await UserService.createAdmin(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);
const createMentor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { mentor, ...userData } = req.body;
    console.log('HITTED IN CREATE USER CONTROLLER' )
    const result = await UserService.createMentor(mentor, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Mentor created successfully!',
      data: result,
    });
  }
);
const createMentee: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { mentee, ...userData } = req.body;

    const result = await UserService.createMentee(mentee,userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Mentee created successfully!',
      data: result,
    });
  }
);
// const getAllClients: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { client, ...userData } = req.body;
//     const result = await UserService.createClient(client, userData);

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Client fetched successfully!',
//       data: result,
//     });
//   }
// );


const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(
    filters,
    paginationOptions
  );

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Clients fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});


const updateUserInformation = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await UserService.updateUserInformation(id, updatedData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  })
);


// const imageUpload: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
 
//     const result = await UserService.imageUpload(req,res);
  

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Image Uploaded Successfully!',
//       data: result,
//     });
//   }
// );

export const UserController = {
  createAdmin,
  createMentor,
  createMentee,
  getAllUsers,
  updateUserInformation,
  // imageUpload
};
