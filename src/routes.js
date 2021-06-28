// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Language from "@material-ui/icons/Language";
import MessageIcon from '@material-ui/icons/Message';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Users from "views/Users/Users";
import Messages from "views/Messages/Messages";
import CentralMedical from "views/CentralMedical/CentralMedical";
import CoverAddress from "views/CoverAddress/CoverAddress";
import DiscoveryAddress from "views/DescoveryAddress/DiscoveryAddress";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import CreateCentralMedical from "views/CentralMedical/CreateCentralmedical";
import CreateCoverAddres from "views/CoverAddress/CreateCoverAddres";
import CreateDiscoverAddres from "views/DescoveryAddress/CreateDiscoveryAddres";

// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/usuarios",
    name: "Usuários",
    rtlName: "لوحة القيادة",
    icon: PeopleAltIcon,
    component: Users,
    layout: "/admin"
  },
  {
    path: "/messages",
    name: "Mensagens",
    rtlName: "لوحة القيادة",
    icon: MessageIcon,
    component: Messages,
    layout: "/admin"
  },
  {
    path: "/central-medical",
    name: "Centros Médicos",
    rtlName: "لوحة القيادة",
    icon: LocalHospitalIcon,
    component: CentralMedical,
    layout: "/admin"
  },
  {
    path: "/create-central-medical",
    name: "Adicionar Centro Médico",
    rtlName: "لوحة القيادة",
    icon: LocalHospitalIcon,
    component: CreateCentralMedical,
    layout: "/admin"
  },
  {
    path: "/cover-address",
    name: "Endereços Cobertos",
    rtlName: "لوحة القيادة",
    icon: VisibilityIcon,
    component: CoverAddress,
    layout: "/admin"
  },
  {
    path: "/create-cover-address",
    name: "Adicionar Endereços Cobertos",
    rtlName: "لوحة القيادة",
    icon: VisibilityIcon,
    component: CreateCoverAddres,
    layout: "/admin"
  },
  {
    path: "/discovery-address",
    name: "Áreas Descobertas",
    rtlName: "لوحة القيادة",
    icon: VisibilityOffIcon,
    component: DiscoveryAddress,
    layout: "/admin"
  },
  {
    path: "/create-discovery-address",
    name: "Adicionar Áreas Descobertas",
    rtlName: "لوحة القيادة",
    icon: VisibilityOffIcon,
    component: CreateDiscoverAddres,
    layout: "/admin"
  },
 /*{
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  },
  {
    collapse: true,
    name: "Dashboards",
    icon: Notifications,
    children: [
      {
        path: "/maps",
        name: "Maps",
        rtlName: "خرائط",
        icon: LocationOn,
        component: Maps,
        layout: "/admin"
      },
    ]
  },*/


];

export default dashboardRoutes;
