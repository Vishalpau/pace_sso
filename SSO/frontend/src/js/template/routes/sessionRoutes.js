import Login from "../../user/auth/Login";
import LoginCode from "../../user/auth/LoginCode";
import Register from "../../user/auth/Register";
import VerifyOtp from "../../user/auth/VerifyOtp";
import LoginNew from "../../user/auth/LoginNew";
import RegisterNew from "../../user/auth/RegisterNew";

export default {
  Home: {
    component: LoginNew,
    path: "/",
  },
  // LoginNew: {
  //   component: LoginNew,
  //   path: "/loginnew",
  // },
  Login: {
    component: LoginNew,
    path: "/login",
  },
  Register: {
    component: RegisterNew,
    path: "/register",
  },
  // RegisterNew: {
  //   component: RegisterNew,
  //   path: "/registerNew",
  // },
  LoginCode: {
    component: Login,
    path: "/login/:code",
  },
  VerifyOtp: {
    component: VerifyOtp,
    path: "/verifyOtp",
  },
  // LoginCode: {
  //     component: LoginCode,
  //     path: '/login/:code'
  // },
};
