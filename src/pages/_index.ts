import { lazy } from "react";

export const Home = lazy(async () => await import("@/pages/home/_index"));

export const Editor = lazy(async () => await import("@/pages/editor/_index"))