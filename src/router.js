import Home from '@/views/Home';
import User from '@/views/User';

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
