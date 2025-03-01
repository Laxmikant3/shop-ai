"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import productsData from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Products = ({ params }) => {
  const { search } = params;
  const router = useRouter();

  if (!search || search.trim() === "") {
    router.push("/");
    return null;
  }

  const filteredProducts = productsData.products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <div className="grid h-[30rem] w-full grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-4 overflow-y-auto">
        {filteredProducts.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

const Product = ({ id, title, description, price, thumbnail, source }) => {
  return (
    <Link href={`/product/${id}`}>
      <Card>
        <CardHeader>
          <Image
            src={thumbnail}
            alt={title}
            width={500}
            height={500}
            className="place-self-center object-cover object-top"
          />
        </CardHeader>
        <CardContent>
          <CardTitle>
            <span className="[text-wrap:balance]">{title}</span>
            <span>${price}</span>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-xl font-bold">
            Source:{" "}
            {source === "A" ? (
              <Button variant="link">
                <Link href="https://amazon.com">Amazon</Link>
              </Button>
            ) : (
              <Button variant="link">
                <Link href="https://ebay.com">eBay</Link>
              </Button>
            )}
          </p>
          <Button className="w-full">Add to cart</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default Products;
