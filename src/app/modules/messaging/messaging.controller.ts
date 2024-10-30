import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { messagingFilterableFields } from './messaging.constants';
import { IMessage } from './messaging.interfaces';
import { MessagingService } from './messaging.service';

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await MessagingService.createMessage(
    academicFacultyData
  );
  sendResponse<IMessage>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your Message Posted successfully',
    data: result,
  });
});

const getSingleMessage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MessagingService.getSingleMessage(id);

  sendResponse<IMessage>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your Message fetched successfully',
    data: result,
  });
});

const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, messagingFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await MessagingService.getAllMessages(
    filters,
    paginationOptions
  );

  sendResponse<IMessage[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your Messages fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// const updateFaculty = catchAsync(
//   catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const updatedData = req.body;

//     const result = await AcademicFacultyService.updateFaculty(id, updatedData);

//     sendResponse<IAcademicFaculty>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Academic faculty updated successfully',
//       data: result,
//     });
//   })
// );
const updateMessageSeenStatus = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id:orderId } = req.params;
    const userId = req.query.userId;

    const result = await MessagingService.updateMessageSeenStatus(orderId, userId);

    sendResponse<IMessage>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Massage seen successfully',
      data: result,
    });
  })
);

// const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await AcademicFacultyService.deleteByIdFromDB(id);

//   sendResponse<IAcademicFaculty>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic faculty deleted successfully',
//     data: result,
//   });
// });

export const MessagingController = {
  createMessage,
  getSingleMessage,
  getAllMessages,
  updateMessageSeenStatus,
};
