"use server";
import { env } from "@lib/config";
import { IOpenCage } from "@/interfaces/services/opencage";

export const search = async <T extends IOpenCage>(
  query: string
): Promise<T> => {
  const urlSearchParams = new URLSearchParams({
    q: query,
    key: env.openCageApiKey!,
    language: "es",
    limit: "4",
  });

  const url = `${
    env.openCageUrl
  }/geocode/v1/json?${urlSearchParams.toString()}`;
  return fetch(url).then((res) => res.json());
};
