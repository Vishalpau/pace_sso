import Dashboards from "../../template/private/components/ContentArea/Dashboards";
// import Dashboards from '../../template/private/components/ContentArea/Portfolio';
import UsersTable from "../../views/UserList/components/UsersTable";

import Companies from "../../views/Companies";
import AddCompany from "../../views/Companies/components/AddCompany";
import CompanyDetailView from "../../views/Companies/components/CompanyDetailView";
import EditCompany from "../../views/Companies/components/EditCompany";

import AddressList from "../../views/Addresses";
import AddAddress from "../../views/Addresses/components/AddAddress";
import AddressDetails from "../../views/Addresses/components/AddressDetails";

import Applications from "../../views/Applications";
import AddApplication from "../../views/Applications/components/AddApplication";
import ApplicationDetailView from "../../views/Applications/components/ApplicationDetailView";
import EditApplication from "../../views/Applications/components/EditApplication";

import Roles from "../../views/ApplicationRoles";
import AddRole from "../../views/ApplicationRoles/components/AddRole";
import RoleDetailView from "../../views/ApplicationRoles/components/RoleDetailView";

import Locations from "../../views/OperatingLocations";
import AddLocation from "../../views/OperatingLocations/components/AddLocation";
import LocationDetailView from "../../views/OperatingLocations/components/LocationDetailView";

import ListSubscriptions from "../../views/Subscriptions";
import AddSubscription from "../../views/Subscriptions/components/AddSubscription";
import SubscriptionDetails from "../../views/Subscriptions/components/SubscriptionDetails";

import ContentArea from "../../template/private/components/ContentArea/ContentArea";
import ApiKeys from "../../views/ApiKeys";
import GenerateApiKey from "../../views/ApiKeys/components/GenerateApiKey";
import ApiKeyDetailView from "../../views/ApiKeys/components/ApiKeyDetailView";
import ResetApiKey from "../../views/ApiKeys/components/ResetApiKey";

import User from "../../views/User";
import UserIdentity from "../../views/User/components/UserIdentity";
import UserPersonal from "../../views/User/components/UserPersonal";
import Invite from "../../views/Invite";
import InviteUser from "../../views/Invite/components/InviteUser";
import ReminderInvite from "../../views/Invite/components/ReminderInvite";
import InviteDetailView from "../../views/Invite/components/InviteDetailView";
// import UserProfile from '../../views/UserProfile/NewUserProfile';
import UserSubscriptions from "../../views/UserList/components/UserSubscriptions/UserSubscriptions";

import Department from "../../views/Department";
import AddDepartment from "../../views/Department/components/AddDepartment";
import EditDepartment from "../../views/Department/components/EditDepartment";

import Project from "../../views/Project/Project";
import AddProject from "../../views/Project/components/AddProject";
import EditProject from "../../views/Project/components/EditProject";
import Company from "../../views/Company/Company";

import UserProfile from "../../views/UserProfile/UserProfile";
import Logout from "../../user/auth/Logout";
import AppSubscriptions from "../../views/AppSubscriptions";

import UpdateUserProfile from "../../views/UserList/components/UsersTable/UpdateUserProfile";

export default {
  Dashboard: {
    component: Dashboards,
    path: "/dashboard",
  },
  AppSubscriptions: {
    component: AppSubscriptions,
    path: "/subscriptions",
  },
  UserProfile: {
    component: UserProfile,
    path: "/userprofile",
  },
  UserSubscriptions: {
    component: UserSubscriptions,
    path: "/usersubscriptions",
  },
  UsersTable: {
    component: UsersTable,
    path: "/users",
  },

  Companies: {
    component: Companies,
    path: "/companies",
  },
  Department: {
    component: Department,
    path: "/department",
  },

  AddDepartment: {
    component: AddDepartment,
    path: "/adddepartment",
  },
  EditDepartment: {
    component: EditDepartment,
    path: "/editdepartment",
  },
  Project: {
    component: Project,
    path: "/project",
  },
  Company: {
    component: Company,
    path: "/operating-location",
  },

  AddProject: {
    component: AddProject,
    path: "/addproject",
  },
  EditProject: {
    component: EditProject,
    path: "/editproject",
  },
  AddCompany: {
    component: AddCompany,
    path: "/addcompany",
  },
  CompanyDetailView: {
    component: CompanyDetailView,
    path: "/companies/:companyId",
  },

  EditCompany: {
    component: EditCompany,
    path: "/companies/editCompany/:companyId",
  },

  Addresses: {
    component: AddressList,
    path: "/addresses",
  },
  UserAddresses: {
    component: AddressList,
    path: "/:uuid/addresses",
  },
  AddAddress: {
    component: AddAddress,
    path: "/:uuid/addresses/add",
  },
  EditAddress: {
    component: AddAddress,
    path: "/:uuid/addresses/update/:id",
  },
  AddressDetails: {
    component: AddressDetails,
    path: "/:uuid/addresses/:id",
  },

  Applications: {
    component: Applications,
    path: "/applications",
  },

  AddApplication: {
    component: AddApplication,
    path: "/addapplication",
  },

  EditApplication: {
    component: EditApplication,
    path: "/applications/editapplication/:appId",
  },

  ApplicationDetailView: {
    component: ApplicationDetailView,
    path: "/applications/:appId",
  },

  Roles: {
    component: Roles,
    path: "/roles/:appId",
  },

  AddRole: {
    component: AddRole,
    path: "/addrole/:appId",
  },

  EditRole: {
    component: AddRole,
    path: "/roles/editroles/:appId/:roleId",
  },

  RoleDetailView: {
    component: RoleDetailView,
    path: "/roles/:appId/:roleId",
  },

  Locations: {
    component: Locations,
    path: "/locations/:companyId",
  },

  AddLocation: {
    component: AddLocation,
    path: "/addlocations/:companyId",
  },

  EditLocation: {
    component: AddLocation,
    path: "/locations/editlocations/:companyId/:locationId",
  },

  LocationDetailView: {
    component: LocationDetailView,
    path: "/locations/:companyId/:locationId",
  },
  AddSubscription: {
    component: AddSubscription,
    path: "/:uuid/subscriptions/add",
  },
  ListSubscriptions: {
    component: ListSubscriptions,
    path: "/subscriptions",
  },

  SubscriptionDetails: {
    component: SubscriptionDetails,
    path: "/:uuid/subscriptions/:id",
  },

  ApiKeys: {
    component: ApiKeys,
    path: "/apikeys/:companyId",
  },

  GenerateApiKey: {
    component: GenerateApiKey,
    path: "/generateapikeys/:companyId",
  },

  ApiKeyDetailView: {
    component: ApiKeyDetailView,
    path: "/apikeys/:companyId/:keyId",
  },

  ResetApiKey: {
    component: ResetApiKey,
    path: "/apikeys/resetapikey/:companyId/:keyId",
  },

  InviteList: {
    component: Invite,
    path: "/invitelist",
  },

  InviteUser: {
    component: InviteUser,
    path: "/inviteuser",
  },

  ReminderInvite: {
    component: ReminderInvite,
    path: "/reminderinvite/:id",
  },

  InviteDetailView: {
    component: InviteDetailView,
    path: "/invites/:id",
  },

  UpdateUserProfile: {
    component: UpdateUserProfile,
    path: "/user/user-profile",
  },
  UserAccount: {
    component: User,
    path: "/user/account",
  },
  UserPersonal: {
    component: UserPersonal,
    path: "/user/personal",
  },
  UserIdentity: {
    component: UserIdentity,
    path: "/user/identity",
  },
  UserLocation: {
    component: User,
    path: "/user/location",
  },
  // Logout: {
  //     component: Logout,
  //     path:'/user/logout'
  // }
};
