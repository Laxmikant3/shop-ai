"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [products, setProducts] = useState([]); // Store products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]); // Store cart items

  // Fetch products from API
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products); // Ensure correct mapping
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // Function to add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log("Added to cart:", product); // Debugging
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="grid h-[30rem] w-full grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-4 overflow-y-auto">
      {products.map((product) => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

// Individual product component
const Product = ({ product, addToCart }) => {
  return (
    <Card key={product.id}>
      <CardHeader className="flex justify-center">
        {/* Ensure image URLs are correct */}
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={200}
          height={200}
          className="object-cover rounded"
          unoptimized 
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-bold">{product.title}</CardTitle>
        <p className="text-sm font-semibold text-gray-600">${product.price}</p>
        <CardDescription className="text-sm">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* Ensures correct product ID is passed */}
        <Link href={`/product/${product.id}`}>
          <Button variant="outline">View</Button>
        </Link>
        <Button onClick={() => addToCart(product)}>Add to cart</Button>
      </CardFooter>
    </Card>
  );
};

export default Products;
