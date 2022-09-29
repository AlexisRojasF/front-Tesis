import { RouteInfo } from './vertical-menu.metadata';

//Sidebar menu Routes and data
export const STUDENT_ROUTES: RouteInfo[] = [
  {
    path: '/student/dashboard', title: 'Inicio', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/student/profile', title: 'Mi perfil', icon: 'ft-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },/*
  {
    path: '/student/help', title: 'Ayuda', icon: 'ft-help-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },*/
  {
    path: '/student/chaea', title: 'Formulario CHAEA', icon: 'ft-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/student/history', title: 'Mis resultados', icon: 'ft-layers', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
];

export const PROFE_ROUTES: RouteInfo[] = [
  {
    path: '/professor/dashboard', title: 'Inicio', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/professor/profile', title: 'Mi perfil', icon: 'ft-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/professor/grupos', title: 'Grupos', icon: 'ft-help-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/professor/estadisticas', title: 'Estadisticas', icon: 'ft-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
];

export const ADMIN_ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard', title: 'Inicio', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/admin/profile', title: 'Mi perfil', icon: 'ft-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/admin/adminis', title: 'Administradores', icon: 'ft-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/admin/usuarios', title: 'Usuarios', icon: 'ft-layers', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/admin/grupos', title: 'Grupos', icon: 'ft-layers', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/admin/facultades', title: 'Facultades', icon: 'ft-layers', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/admin/test', title: 'Tests', icon: 'ft-layers', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/admin/history', title: 'Estadisticas', icon: 'ft-layers', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },/*
  {
    path: '/admin/reportes', title: 'reportes', icon: 'ft-layers', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },*/
];
