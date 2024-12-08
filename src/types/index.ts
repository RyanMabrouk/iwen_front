import { ComparisonOperator } from "kysely";
import { Tables } from "./database.types";

export interface InfinityPaginationQueryType<
  EntityFilterKeys extends string | number | symbol,
> {
  page?: number;
  limit?: number;
  sort?: {
    order: "asc" | "desc";
    orderBy: EntityFilterKeys;
  };
  filters?: {
    [key in EntityFilterKeys]?: {
      operator: ComparisonOperator;
      value: string | null | string[];
    }[];
  };
  search?: {
    [key in EntityFilterKeys]?: {
      operator: ComparisonOperator;
      value: string | null | string[];
    }[];
  };
}
export type InfinityPaginationResultType<T> = Readonly<{
  data: T[];
  meta: {
    page: number;
    limit: number;
    total_pages: number;
    has_next_page: boolean;
    has_previous_page: boolean;
    total_count: number;
  };
}>;

export interface IOrderProduct
  extends Tables<"orders_products">,
    Tables<"books"> {}

export interface IOrder extends Tables<"orders"> {
  products: IOrderProduct[];
}
type SortType = "asc" | "desc";
export interface IBookPayload {
  title?: string;
  writer_id?: string;
  share_house_id?: string;
  editor: string;
  release_year: number;
  description: string;
  weight: number;
  isbn: string;
  price: number;
  price_dhs: number;
  discount: number;
  stock: number;
  meta_keywords: string[];
  images_urls: string[];
  categories_ids: string[];
  subcategories_ids: string[];
  page_count: number;
  cover_type_id?: string;
  corner_id?: string;
  status?: string;
  discount_type: "percentage" | "fixed";
  meta_image?: string;
  meta_title: string;
  meta_description: string;
  canonical: string;
  slug: string;
  structured_data: FormDataEntryValue | null;
  is_in_wishlist: boolean;
}

export type BookSummary = Pick<
  Tables<"books">,
  | "id"
  | "title"
  | "slug"
  | "images_urls"
  | "price"
  | "price_after_discount"
  | "discount"
  | "discount_type"
  | "price_dollar"
>;

export interface IBookPopulated extends Tables<"books"> {
  writer_books: BookSummary[];
  recommended_books: IBookPopulated[];
  categories: Tables<"categories">[];
  subcategories: Tables<"subcategories">[];
  cover_type: Tables<"cover_types"> | null;
  writer: Tables<"writers"> | null;
  share_house: Tables<"share_houses"> | null;
  corner: Tables<"corners"> | null;
  total_rating: number;
  total_reviews_count: number;
  is_in_wishlist: boolean;
}

export interface ICartBook extends Tables<"books"> {
  quantity: number;
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export interface IError<T extends object> {
  message: string;
  detail: string;
  type: string;
  timestamp: number;
  errors?: IValidationErrors<T>;
}
export type IValidationErrors<T extends object> = {
  [key in keyof T]: string[];
};

export interface IUserPayload extends Tables<"users"> {
  total_spent: number;
}
