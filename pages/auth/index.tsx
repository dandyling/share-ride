import { Button, Text, Title } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { AiFillCar } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { Layout } from "../../components/layout";

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
        <Button
          size="lg"
          className="w-full rounded-2xl bg-primary"
          rightIcon={<FaArrowRight className="text-sm" />}
          onClick={() => router.push("/auth/enter-phone-number")}
        >
          Login
        </Button>
      </div>
    </Layout>
  );
};

export default IndexPage;
