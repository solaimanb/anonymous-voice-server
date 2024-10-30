import express from 'express';

import { AboutPageRoutes } from '../modules/aboutUsPage/aboutPage.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { CategoriesRoutes } from '../modules/category/categories.route';
import { ClientOrderRoutes } from '../modules/clientOrder/clientOrder.route';
import { ClientQueryRoutes } from '../modules/clientQueries/clientQueries.route';
import { ReviewRoutes } from '../modules/clientReview/clientReview.route';
import { FileUploadRoutes } from '../modules/fileUpload/fileUPload.route';
import { HomePageRoutes } from '../modules/homePage/homePage.route';
import { MessagingRoutes } from '../modules/messaging/messaging.route';
import { NotificationRoutes } from '../modules/notification/notification.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { PortfolioRoutes } from '../modules/portfolioPage/portfolio.route';
import { ServicePageRoutes } from '../modules/servicePage/servicePage.route';
import { TestimonialRoutes } from '../modules/testimonialPage/testimonial.route';
import { UserRoutes } from '../modules/user/user.route';
import { UserDetailsRoutes } from '../modules/userDetails/userDetails.route';

const router = express.Router();

const moduleRoutes = [

  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/userDetails',
    route: UserDetailsRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/orders',
    route: ClientOrderRoutes,
  },
  {
    path: '/message',
    route: MessagingRoutes,
  },
  {
    path: '/query',
    route: ClientQueryRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/blog-post',
    route: BlogRoutes,
  },
  {
    path: '/file-upload',
    route: FileUploadRoutes,
  },
  {
    path: '/app-notification',
    route: NotificationRoutes,
  },
  {
    path: '/client-review',
    route: ReviewRoutes,
  },
  {
    path: '/service-page',
    route: ServicePageRoutes,
  },
  {
    path: '/portfolio',
    route: PortfolioRoutes,
  },
  {
    path: '/testimonial',
    route: TestimonialRoutes,
  },
  {
    path: '/about-page',
    route: AboutPageRoutes,
  },
  {
    path: '/home-page',
    route: HomePageRoutes,
  },
  {
    path: '/categories',
    route: CategoriesRoutes,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
