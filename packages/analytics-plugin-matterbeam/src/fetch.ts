// @ts-expect-error moduleResolution:nodenext
import type { RequestInfo, RequestInit } from "node-fetch";

export const fetch = async function (
  url: URL | RequestInfo,
  init?: RequestInit,
) {
  const { default: fetch } = await import("node-fetch");
  return await fetch(url, init);
};
