"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, Check, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "@/api/uploadFile";
import { useToast } from "@/hooks/useToast";
import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";
import { IUserPayload, IValidationErrors } from "@/types";

interface ProfilePictureUploadProps {
  defaultProfilePic: string | null | undefined;
}

export default function ProfilePictureUpload({
  defaultProfilePic,
}: ProfilePictureUploadProps) {
  const [preview, setPreview] = useState<string>(
    defaultProfilePic ?? "/default_avatar.png",
  );
  const [isNewImage, setIsNewImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    setPreview(defaultProfilePic ?? "/default_avatar.png");
  }, [defaultProfilePic]);

  const updateAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      setIsSubmitting(true);
      const url = getEndpoint({ resource: "users", action: "updateMe" });
      try {
        const formData = new FormData();
        formData.append("filepicture", file);
        const image_url = await uploadFile({
          formData,
          name: "filepicture",
          title: uuidv4(),
        });
        const payload = { avatar: image_url };
        const { error, validationErrors } = await sendRequest<
          IUserPayload,
          IUserPayload
        >({ method: "PATCH", url: url(), payload: payload });
        if (error || validationErrors) {
          throw new Error("فشل تحديث الصورة الشخصية");
        }
        return image_url;
      } finally {
        setIsSubmitting(false);
      }
    },
    onSuccess: (newImageUrl) => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      setPreview(newImageUrl);
      setIsNewImage(false);
      toast.success("تم تحديث الصورة الشخصية بنجاح.");
    },
    onError: (error) => {
      toast.error(`فشل تحديث الصورة الشخصية`);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setIsNewImage(true);
    }
  };

  const handleSubmit = () => {
    if (typeof window === "undefined") return;
    const fileInput = document.querySelector<HTMLInputElement>(
      "#profile-picture-upload",
    );
    const file = fileInput?.files?.[0];
    if (file) {
      updateAvatarMutation.mutate(file);
    }
  };

  return (
    <div className="relative inline-block" dir="rtl">
      <Image
        src={preview || "/default_avatar.png"}
        alt=""
        width={500}
        height={500}
        className="h-full w-20 rounded-full sm:w-28 md:w-[9rem]"
      />
      <label
        htmlFor="profile-picture-upload"
        className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-1 shadow-md"
        title="تغيير الصورة الشخصية"
      >
        <Camera className="h-4 w-4 text-gray-600" />
      </label>
      <input
        id="profile-picture-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="sr-only"
      />
      {isNewImage && !isSubmitting && (
        <div
          className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50"
          onClick={handleSubmit}
          title="حفظ الصورة الجديدة"
        >
          <Check className="h-8 w-8 text-white" />
        </div>
      )}
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50">
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        </div>
      )}
    </div>
  );
}
