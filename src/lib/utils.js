import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getHomeUrl(role) {
  const homeUrl = {
    User: '/',
    MarkerCoordinator: '/coordinator',
    CourseSupervisor: '/supervisor/'
  }
  return homeUrl[role] || '/'
}

export const getSemesterId = ()=>{
  return localStorage.getItem('semesterId');
}
