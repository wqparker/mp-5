import { redirect } from "next/navigation";
import getOriginalUrl from "@/lib/get-original-url";

type Props = {
  params: {
    alias: string;
  };
};

export default async function AliasPage({ params }: Props) {
  const { alias } = params;
  
  // Get the original URL for this alias
  const targetUrl = await getOriginalUrl(alias);
  
  // If no URL found, redirect to home page
  if (!targetUrl) {
    redirect("/");
  }
  
  // Redirect to the original URL
  redirect(targetUrl);
}
