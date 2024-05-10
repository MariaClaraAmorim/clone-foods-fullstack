import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { Carousel, CarouselContent } from "@/app/_components/ui/carousel";
import CategoryItem from "@/app/_components/category-item";
import StarBadge from "@/app/_components/star";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }
  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div>
      <RestaurantImage
        restaurant={restaurant}
        userFavoriteRestaurants={userFavoriteRestaurants}
      />

      <div className="relative z-50 -mt-5 rounded-t-lg bg-background px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="relative h-8 w-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                sizes="100%"
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-xl font-semibold">{restaurant.name}</h1>
          </div>

          <StarBadge restaurant={restaurant} />
          {/*   <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div> */}
        </div>

        <div className="px-5">
          <DeliveryInfo restaurant={restaurant} />
        </div>

        <Carousel className="px-5">
          <CarouselContent className="-ml-0 flex  gap-4 pb-2">
            {restaurant.categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-6 space-y-4">
          {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
          <h2 className="px-5  font-semibold">Mais Pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 space-y-4" key={category.id}>
            {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
            <h2 className="px-5  font-semibold">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </div>
    </div>
  );
};

export default RestaurantPage;
