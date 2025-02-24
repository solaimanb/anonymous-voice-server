import express from "express";

import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { NotificationController } from "./notification.controller";

const router = express.Router();

router.post("/create-notification", NotificationController.createNotification);

router.get(
  "/:id",
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  NotificationController.getSingleNotification
);

router.get("/", NotificationController.getAllNotification);

router.patch("/:id", NotificationController.updateNotificationSeenStatus);

export const NotificationRoutes = router;
