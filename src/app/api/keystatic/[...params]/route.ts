import { makeRouteHandler } from "@keystatic/next/route-handler";
import config, { cmsEnabled } from "../../../../../keystatic.config";

// Until the CMS's GitHub App is set up (docs/CMS.md), the live site has no
// CMS API; the admin page explains how to connect it.
const off = () => new Response("Not found", { status: 404 });
const handler = cmsEnabled ? makeRouteHandler({ config }) : null;

export const GET = handler?.GET ?? off;
export const POST = handler?.POST ?? off;
