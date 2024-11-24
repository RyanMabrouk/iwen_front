import { addressesEndpoints } from "@/endpoints/addressesRoutes";
import { booksEndpoints } from "@/endpoints/booksRoutes";
import { categoriesEndpoints } from "@/endpoints/categoriesRoutes";
import { cornersEndpoints } from "@/endpoints/cornersRoutes";
import { cover_typesEndpoints } from "@/endpoints/coverTypes";
import { ordersEndpoints } from "@/endpoints/ordersRoutes";
import { publishHousesEndpoints } from "@/endpoints/publishHouses";
import { subCategoriesEndpoints } from "@/endpoints/subCategories";
import { usersEndpoints } from "@/endpoints/users";
import { writersEndpoints } from "@/endpoints/writers";
export type CRUDMethod = "GET" | "POST" | "PATCH" | "DELETE";
const resources = {
  users: usersEndpoints,
  books: booksEndpoints,
  categories: categoriesEndpoints,
  cover_types: cover_typesEndpoints,
  publish_houses: publishHousesEndpoints,
  subcategories: subCategoriesEndpoints,
  writers: writersEndpoints,
  corners: cornersEndpoints,
  orders: ordersEndpoints,
  addresses :addressesEndpoints
} as const;
export type IResource = keyof typeof resources;
export default function getEndpoint<
  IEndpointResource extends IResource,
  IAction extends keyof (typeof resources)[IEndpointResource],
>({
  resource: resource,
  action,
}: {
  resource: IEndpointResource;
  action: IAction;
}) {
  const url = resources[resource][action];
  return url;
}
