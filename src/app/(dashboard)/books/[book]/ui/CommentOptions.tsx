"use client";

import React from "react";
import Image from "next/image";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface CommentOptionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function CommentOptions({ onEdit, onDelete }: CommentOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-0 outline-none" asChild>
        <Button variant="ghost" className="h-8 w-8 border-0 p-0 outline-none">
          <Image
            src="/dashboard/book/options.png"
            alt="options"
            className="border-0 outline-none"
            width={20}
            height={20}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[10rem]" align="end">
        <DropdownMenuItem
          className="flex items-center gap-2"
          dir="rtl"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4" />
          <span>تعديل التعليق</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          dir="rtl"
          onClick={onDelete}
        >
          <Trash className="h-4 w-4" />
          <span>حذف التعليق</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
