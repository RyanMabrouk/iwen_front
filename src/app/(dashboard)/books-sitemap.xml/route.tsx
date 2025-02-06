import { getBooks } from "@/hooks/data/books/booksQuery";
import { IBookPopulated } from "@/types";

const siteUrl = "https://www.dar-iwan.shop"; // Replace with your actual site URL
const defaultPriority = 0.8;
const defaultFrequency = "daily";

// Fetch all books
async function fetchBooks(page: number, limit: number) {
  const { data, error } = await getBooks({ page, limit });
  console.log("🚀 ~ fetchBooks ~ data:", data)
  console.log("🚀 ~ fetchBooks ~ error1:", error)
  if (error) {
    console.log("🚀 ~ fetchBooks ~ error2:", error)
    console.error("Error fetching books:", error);
    return [];
  }
  return data?.data ?? [];
}

// Main GET function to generate sitemap
export async function GET() {
  try {
    let books: IBookPopulated[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const fetchedBooks = await fetchBooks(page, 8); // Fetch books in chunks of 100
      console.log("🚀 ~ GET ~ fetchedBooks:", fetchedBooks)
      if (fetchedBooks.length === 0) {
        hasMore = false;
      } else {
        books = [...books, ...fetchedBooks];
        page++;
      }
    }

    if (books.length === 0) {
      console.log("🚀 ~ GET ~ books:", books)
      return new Response("No books found to generate sitemap", {
        status: 404,
      });
    }

    // Build the URLs for the sitemap
    const urls = books.map((book) => {
      const bookUrl = `${siteUrl}/books/${book.id}`;
      return `<url>
                <loc>${bookUrl}</loc>
                <changefreq>${defaultFrequency}</changefreq>
                <priority>${defaultPriority}</priority>
              </url>`;
    });

    // Construct the sitemap XML
    const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                        ${urls.join("")}
                      </urlset>`;

    // Return the response with the generated sitemap
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
