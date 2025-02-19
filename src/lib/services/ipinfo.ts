"use server";
import { env } from "@lib/config";
import { IIPInfo } from "@interfaces/services/ipinfo";

export const queryCurrentLocation = async <T extends IIPInfo>(): Promise<T> => {
  const url = `${env.ipInfoUrl}/json?token=${env.ipInfoKey}`;
  return fetch(url).then((res) => res.json());
};
