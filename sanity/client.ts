import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "./env";

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
    })
  : createClient({
      projectId: "placeholder",
      dataset: "production",
      apiVersion,
      useCdn: false,
    });
