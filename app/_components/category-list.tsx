import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";
import { Carousel, CarouselContent } from "./ui/carousel";

const CategoryList = async () => {
  const categories = await db.category.findMany({});

  return (
    <Carousel>
      <CarouselContent className="-ml-0 flex gap-3 pb-2">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CategoryList;
