"use server";

import { URLS_COLLECTION } from "@/lib/db";
import getCollection from "@/lib/db";
import { UrlProps } from "@/types";

// logic to retrieve original url
export default async function GetOriginalUrl(alias: string): Promise<string | null> {
  if (!alias) {
    return null;
  }

  const collection = await getCollection(URLS_COLLECTION);
  
  const result = await collection.findOne<UrlProps>({ alias });
  
  return result?.target || null;
}
