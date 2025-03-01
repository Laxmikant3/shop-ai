"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Categories = () => {
  const categories = ["Women", "Men", "Kids", "Shoes", "Electronics", "Other"];
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    try {
      fetch("http://localhost:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search }),
      });
    } catch (error) {
      console.error("Search request failed", error);
    }
    router.push(`/search/${search}`);
    setSearch("");
  };

  return (
    <nav className="flex items-center justify-between gap-8 border-b-2 border-gray-400 px-8">
      <Image
        src="/logo.svg"
        alt="logo"
        width={100}
        height={100}
        className="aspect-square w-12 shrink-0 object-contain"
      />
      <RadioGroup
        defaultValue="Electronics"
        className="flex justify-center gap-16 py-4"
        onValueChange={(value) => console.log(value)}
        onClick={() => router.push("/")}
      >
        {categories.map((category) => (
          <div className="relative flex h-6 items-center text-center" key={category}>
            <Label htmlFor={category}>
              <RadioGroupItem
                value={category}
                id={category}
                className="absolute -inset-2 aspect-auto h-auto w-auto rounded border-none"
              />
              {category}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          type="submit"
          className="aspect-square h-8 p-2"
          onClick={handleSearch}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};

export default Categories;
