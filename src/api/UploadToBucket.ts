"use server";
import { createClient } from "@/lib/supabase";
import { PostgrestError } from '@supabase/supabase-js';

export async function UploadToBucket({
  file,
  fileName,
  bucketName,
}: {
  file: File;
  fileName: string;
  bucketName: string;
}): Promise<{ data: any; error: any | null }> {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
  return { data, error };
}
