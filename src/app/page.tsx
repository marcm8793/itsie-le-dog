import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Button asChild>
        <Link href="/upload">Upload documents</Link>
      </Button>
    </div>
  );
}
