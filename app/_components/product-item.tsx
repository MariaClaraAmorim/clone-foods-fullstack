"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (

    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="w-full space-y-3">
        <Link
          href={`/products/${product.id}`}
        >
          <div className="w-full space-y-2">
            <div className="relative aspect-square w-full h-[136px]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="100%"
                className="rounded-lg object-cover shadow-md"
              />

              {product.discountPercentage && (
                <div className="absolute left-2 top-2 items-center gap-[2px] flex w-fit min-w-fit shadow-md text-primary dark:bg-zinc-950/30 rounded-full px-2 py-[2px] ">
                  <ArrowDownIcon size={12} />
                  <span className="text-xs font-semibold">
                    {product.discountPercentage}%
                  </span>
                </div>
              )}
            </div>

            <div>
              <h2 className="truncate text-sm">{product.name}</h2>
              <div className="flex items-center gap-1">
                <h3 className="font-semibold">
                  {formatCurrency(calculateProductTotalPrice(product))}
                </h3>
                {product.discountPercentage > 0 && (
                  <span className="text-xs  text-muted-foreground line-through">
                    {formatCurrency(Number(product.price))}
                  </span>
                )}
              </div>

              <span className="block text-xs text-muted-foreground">
                {product.restaurant.name}
              </span>
            </div>
          </div>
        </Link> </div>
    </div>
  );
};

export default ProductItem;
