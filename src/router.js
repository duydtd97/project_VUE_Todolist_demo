import Home from '@/views/Home/index';
import User from '@/views/User/index';

export const routes =
  [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/user",
      name: "user",
      component: User
    }
  ];
