"use server";
import { IDbTableName } from "@/types/generic.types";
import { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";
export default async function postData<ITableName extends IDbTableName>({
  tableName,
  payload,
}: {
  tableName: ITableName;
  payload: TablesInsert<ITableName>[];
}): Promise<{
  data: Tables<ITableName>[] | null;
  error: PostgrestError | null;
}> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(tableName)
    .insert(payload as any)
    .select("*");
  return { data, error } as any;
}
