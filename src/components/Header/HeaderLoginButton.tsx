"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import PrimaryButton from "../main/buttons/PrimaryButton";
import useCurrentUser from "@/hooks/data/user/useCurrentUser";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import signOut from "@/actions/auth/signout";
import { useRouter } from "next/navigation"; // Client-side navigation

export default function HeaderLoginButton() {
  const { data: user } = useCurrentUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // Initialize router

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const queryClient = useQueryClient();

  const { mutate: signOutUser } = useMutation({
    mutationFn: async () => {
      await signOut();
      setIsDropdownOpen(false);
      await queryClient.invalidateQueries(); // Invalidate all queries
      router.push("/login"); // Client-side navigation
    },
    onError: (error) => {
      // Optional: Handle sign-out errors here
      console.error("Error signing out:", error);
    },
  });

  const handleLogout = () => {
    signOutUser();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (window && document) {
      if (isDropdownOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  if (user?.data) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex h-[3rem] w-fit min-w-[50px] items-center justify-center rounded-lg bg-white shadow-md"
        >
          <Image
            className="h-[3rem] rounded-lg"
            src={user.data.avatar ? user.data.avatar : "/default_avatar.png"}
            width={50}
            height={50}
            alt="User Avatar"
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 z-50 mt-2 w-32 origin-top scale-100 transform rounded-md bg-white font-medium opacity-100 shadow-lg transition duration-200 ease-out">
            <Link
              href="/profile"
              onClick={() => {
                setIsDropdownOpen(false);
              }}
            >
              <span className="block w-full cursor-pointer rounded-t-md px-4 py-2 text-gray-800 transition hover:bg-gray-100">
                حسابي
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="z-50 w-full cursor-pointer rounded-b-md px-4 py-2 text-right text-gray-800 transition hover:bg-gray-100"
            >
              خروج
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <Link href="/login">
      <PrimaryButton className="w-full min-w-[150px]" size="md">
        انشاء حساب
      </PrimaryButton>
    </Link>
  );
}
