import { Hero } from "@/components/Hero";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { address, isConnected, isDisconnected } = useAccount();
  useEffect(() => {
    if (isDisconnected) {
      router.push("/landing");
    }
  }, [isDisconnected, router]);

  if (isConnected) {
    router.push("/dashboard");
  }

  return null;
}
