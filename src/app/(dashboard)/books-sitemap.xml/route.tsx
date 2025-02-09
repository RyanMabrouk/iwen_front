import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";

const siteUrl = "https://www.dar-iwan.shop";
const defaultPriority = 0.8;
const defaultFrequency = "daily";

// Fetch all book slugs
async function fetchSlugs() {
  const url = getEndpoint({ resource: "books", action: "getSlugs" });
  return await sendRequest<{ slug: string }[]>({ method: "GET", url: url() });
}
export async function GET() {
  try {
    const slugs = await fetchSlugs();
    console.log("🚀 ~ GET ~ slugs:", slugs.data);

    if (!slugs || slugs.data?.length === 0) {
      return new Response("No books found to generate sitemap", {
        status: 404,
      });
    }
    const urls = slugs.data?.map(({ slug }) => {
      const bookUrl = `${siteUrl}/books/${slug}`;
      return `<url>
                <loc>${bookUrl}</loc>
                <changefreq>${defaultFrequency}</changefreq>
                <priority>${defaultPriority}</priority>
              </url>`;
    });

    // Construct the sitemap XML
    const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                      ${urls?.join("")}
                    </urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (err) {
    console.error("Error generating sitemap:", err);
    return new Response("Error generating sitemap", { status: 500 });
  }
}
