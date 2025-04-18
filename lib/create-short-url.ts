"use server";

import { URLS_COLLECTION } from "@/lib/db";
import getCollection from "@/lib/db";
import { UrlProps } from "@/types";
import dns from 'dns/promises';

// handle the validating of urls, make sure to follow the logic from piazza post about dns
async function isValidUrl(url: string): Promise<boolean> {
  try {
    const urlObj = new URL(url);
    
    if (!url.trim()) {
      return false;
    }

    try {
      await dns.lookup(urlObj.hostname);
      return true;
    } catch {
      return false;
    }
  } catch {
    return false;
  }
}

// create the actual short url
export default async function CreateShortUrl(
  alias: string,
  target: string
): Promise<{ success: boolean; message: string }> {
  if (!alias || !target) {
    return { success: false, message: "Alias and Target URL are required." };
  }

  // validation first
  if (!(await isValidUrl(target))) {
    return { success: false, message: "Invalid target URL or domain does not exist." };
  }

  const collection = await getCollection(URLS_COLLECTION);

  // check mongodb for duplicate
  const existing = await collection.findOne<UrlProps>({ alias });
  if (existing) {
    return { success: false, message: "Alias already taken." };
  }

  // pass new data to mongodb
  const newMapping: UrlProps = { alias, target };
  const result = await collection.insertOne(newMapping);

  if (result.acknowledged) {
    return { success: true, message: "Shortened URL created successfully!" };
  } else {
    return { success: false, message: "Failed to create shortened URL." };
  }
}
