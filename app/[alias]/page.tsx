import { redirect } from "next/navigation";
import getOriginalUrl from "@/lib/get-original-url";

export default async function AliasPage({
    params,
}: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;
  
    // Get the original URL for this alias
    const targetUrl = await getOriginalUrl(alias);
  
    // If no URL found, redirect to home page
    if (!targetUrl) {
        redirect("/");
    }
  
    // Redirect to the original URL
    redirect(targetUrl);
}
