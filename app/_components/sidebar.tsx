import {
    MenuIcon,
    LogInIcon,
    HomeIcon,
    ScrollTextIcon,
    HeartIcon,
    LogOutIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { ModeToggle } from "./theme-provider/toggle";

export default function Sidebar() {
    const { data } = useSession();

    const handleSignOutClick = () => signOut();
    const handleSignInClick = () => signIn();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    className="border-none bg-background"
                >
                    <MenuIcon />
                </Button>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

                {data?.user ? (
                    <>
                        <div className="flex justify-between pt-6">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage
                                        src={data?.user?.image as string | undefined}
                                    />
                                    <AvatarFallback>
                                        {data?.user?.name?.split(" ")[0][0]}
                                        {data?.user?.name?.split(" ")[1][0]}
                                    </AvatarFallback>
                                </Avatar>

                                <div>
                                    <h3 className="font-semibold">{data?.user?.name}</h3>
                                    <span className="block text-xs text-muted-foreground">
                                        {data?.user?.email}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-between pt-10">
                            <h2 className="font-semibold text-primary">Olá. Faça seu login! 🤗</h2>
                            <Button size="icon" onClick={handleSignInClick}>
                                <LogInIcon />
                            </Button>
                        </div>
                    </>
                )}

                <div className="py-6">
                    <Separator />
                </div>

                <div className="space-y-2">
                    <Button
                        className="w-full justify-start space-x-3  rounded-md text-sm font-normal"
                        asChild
                    >
                        <Link href="/">
                            <HomeIcon size={16} />
                            <span className="block">Início</span>
                        </Link>
                    </Button>

                    {data?.user && (
                        <>
                            <Button
                                className="w-full justify-start space-x-3  rounded-md text-sm font-normal"
                                asChild
                            >
                                <Link href="/my-orders">
                                    <ScrollTextIcon size={16} />
                                    <span className="block">Meus Pedidos</span>
                                </Link>
                            </Button>

                            <Button
                                className="w-full justify-start space-x-3  rounded-md text-sm font-normal"
                                asChild
                            >
                                <Link href="/my-favorite-restaurants">
                                    <HeartIcon size={16} />
                                    <span className="block">Restaurantes Favoritos</span>
                                </Link>
                            </Button>
                        </>
                    )}


                    <ModeToggle />
                </div>

                <div className="py-6">
                    <Separator />
                </div>

                {data?.user && (
                    <Button
                        className="w-full justify-start space-x-3  rounded-md text-sm font-normal"
                        onClick={handleSignOutClick}
                    >
                        <LogOutIcon size={16} />
                        <span className="block">Sair da conta</span>
                    </Button>
                )}
            </SheetContent>
        </Sheet>
    );
}
