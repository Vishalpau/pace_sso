//import Home from '../../views/Home';
//import RecoveryPassword from '../../user/auth/Login';
import SetupAccount from "../../views/SetupAccount";
import RecoveryPassword from "../../user/auth/RecoveryPassword";
//import InputRecoveryPassword from '../../user/auth/InputRecoveryPassword';
import LoginPassword from "../../user/auth/LoginPassword";
import ReCreatePassword from "../../user/auth/ReCreatePassword";
import Login from "../../user/auth/Login";
import EmailMobileVerification from "../../user/auth/EmailMobileVerification";
import LoginAD from "../../user/auth/LoginAD";

import SelectADCompany from "../../user/auth/SelectADCompany";
import SelectSingleCompany from "../../user/auth/SelectSingleCompany";
import SelectSingleProject from "../../user/auth/SelectSingleProject";
import InviteeLink from "../../views/Invite/components/InviteeLink";
import Logout from "../../user/auth/Logout";
import SelectProject from "../../user/auth/SelectProject";

export default {
  // Home: {
  //     component: Login,
  //     path: '/'
  // },
  // Login: {
  //     component: Login,
  //     path: '/login'
  // },

  SelectADCompany: {
    component: SelectADCompany,
    path: "/selectcompany",
  },

  SelectSingleCompany: {
    component: SelectSingleCompany,
    path: "/selectsinglecompany",
  },

  SelectSingleProject: {
    component: SelectSingleProject,
    path: "/selectsingleproject/:id",
  },

  SelectProject: {
    component: SelectProject,
    path: "/selectproject/:id",
  },

  LoginAD: {
    component: LoginAD,
    path: "/loginwithad",
  },

  SetupAccount: {
    component: SetupAccount,
    path: "/user/setup-account/:path",
  },
  RecoveryPassword: {
    component: RecoveryPassword,
    path: "/recoveryPassword",
  },
  // InputRecoveryPassword: {
  //     component: InputRecoveryPassword,
  //     path: '/inputRecoveryPassword'
  // },
  LoginPassword: {
    component: LoginPassword,
    path: "/loginPassword",
  },
  ReCreatePassword: {
    component: ReCreatePassword,
    path: "/reCreatePassword",
  },
  EmailMobileVerification: {
    component: EmailMobileVerification,
    path: "/emailMobileVerification",
  },

  InviteeLink: {
    component: InviteeLink,
    path: "/referralCode/:referralCode",
  },

  Logout: {
    component: Logout,
    path: "/user/logout",
  },
};
