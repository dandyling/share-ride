import { Button, Title, Text } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa";
import { Layout } from "../../components/layout";
import { AiFillCar } from "react-icons/ai";

const IndexPage: NextPage = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full p-16 space-y-16">
        <div className="flex flex-col items-center w-full space-y-4">
          <AiFillCar className="my-4 text-9xl text-primary" />
          <Title order={1} className="text-ferra">
            ShareRide
          </Title>
          <Text className="font-semibold text-zinc-500">
            Share your ride with others
          </Text>
        </div>
        <div className="flex flex-col items-center w-full space-y-4">
          <Button
            size="lg"
            className="w-full rounded-2xl bg-primary"
            onClick={() => router.push("/auth/sign-up")}
          >
            Sign Up
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full rounded-2xl text-primary border-primary"
            rightIcon={<FaArrowRight className="text-sm" />}
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
