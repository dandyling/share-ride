import { ActionIcon, clsx, Footer } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineCar, AiOutlineUser } from "react-icons/ai";
import { TbSteeringWheel } from "react-icons/tb";

export const TabBar = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Footer className="flex justify-center p-4" height={64}>
      <div className="flex items-center justify-around w-full max-w-4xl">
        <Link href="/">
          <ActionIcon>
            <AiOutlineCar
              className={clsx("text-2xl", { "text-ferra": pathname === "/" })}
            />
          </ActionIcon>
        </Link>
        <Link href="/offer-ride">
          <ActionIcon>
            <TbSteeringWheel
              className={clsx("text-2xl", {
                "text-ferra": pathname === "/offer-ride",
              })}
            />
          </ActionIcon>
        </Link>
        <Link href="/profile">
          <ActionIcon>
            <AiOutlineUser
              className={clsx("text-2xl", {
                "text-ferra": pathname === "/profile",
              })}
            />
          </ActionIcon>
        </Link>
      </div>
    </Footer>
  );
};
