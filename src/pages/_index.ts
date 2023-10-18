import { lazy } from "react";

export const Login = lazy(async () => await import('@/pages/login/_index'))

export const Home = lazy(async () => await import("@/pages/home/_index"));

export const Tour = lazy(async () => await import('@/pages/tour/_index'))

export const Tours = lazy(async () => await import('@/pages/tours/_index'))

export const Editor = lazy(async () => await import("@/pages/editor/_index"))