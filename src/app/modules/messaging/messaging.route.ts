import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { MessagingController } from './messaging.controller';

const router = express.Router();

router.post(
  '/create-message',
  // validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  MessagingController.createMessage
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  MessagingController.getSingleMessage
);

router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY
  // ),
  MessagingController.getAllMessages
);

router.patch(
  '/:id',
  // validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY
  // ),
  MessagingController.updateMessageSeenStatus
);


// router.patch(
//   '/:id',
//   validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.FACULTY
//   ),
//   AcademicFacultyController.updateFaculty
// );

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN),
//   AcademicFacultyController.deleteFaculty
// );

export const MessagingRoutes = router;
