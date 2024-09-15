import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import CustomMenu from "./CustomMenu";
import { Analytics } from "@vercel/analytics/react"

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout menu={CustomMenu}>
    {children}
    <CheckForApplicationUpdate />
    <Analytics />
  </RALayout>
);
