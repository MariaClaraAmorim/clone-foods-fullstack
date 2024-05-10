import { Prisma } from "@prisma/client";
import ProductItem from "./product-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <Carousel>
      <CarouselContent className="-ml-0 mb-6 gap-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-3/3 pl-0">
            <ProductItem key={product.id} product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductList;
