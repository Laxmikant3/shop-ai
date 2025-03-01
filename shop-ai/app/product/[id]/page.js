"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import productsData from "@/data/products.json"; // ✅ Correct JSON import

const ProductPage = () => {
  const params = useParams(); 
  const id = params?.id; // ✅ Ensure params exist before accessing id

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProduct = productsData.products.find((p) => String(p.id) === id);
      setProduct(foundProduct || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!product) return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-600">{product.description}</p>

      {/* ✅ Next.js optimized image */}
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={500}
        height={500}
        className="mt-4 rounded-md shadow-md"
        priority
        unoptimized 
      />

      <p className="mt-4 text-lg font-semibold">${product.price}</p>
    </div>
  );
};

export default ProductPage;
