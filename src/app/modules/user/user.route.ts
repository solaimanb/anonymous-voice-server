import express from 'express';

import { UserController } from './user.controller';
const path = require('path');

const router = express.Router();
/**
 * @swagger
 * /:
 *   get:
 *     description: Why you no work?
 *     responses:
 *       200:
 *         description: Returns nothing cause this shit won't work.
 */
router.post(
  '/create-client',
  // validateRequest(UserValidation.createAdminZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createClient
);

router.post(
  '/create-admin',
  // validateRequest(UserValidation.createAdminZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin
);

router.get(
  '/get-users',
  // validateRequest(UserValidation.createAdminZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers
);

// router.get(
//   '/:id',
//   // validateRequest(UserValidation.createAdminZodSchema),
//   // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   UserController.getIndividualUser
// );

router.patch(
  '/:id',
  // validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY
  // ),
  UserController.updateUserInformation
);


router.post(
  '/image-upload',
  // validateRequest(UserValidation.createAdminZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
   UserController.imageUpload
);

export const UserRoutes = router;
