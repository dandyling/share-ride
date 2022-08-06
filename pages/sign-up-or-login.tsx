import { Button } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa";
import { Layout } from "../components/layout";

const SignUpOrLogin: NextPage = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="flex flex-col justify-center h-full p-8 space-y-4">
        <Button
          size="lg"
          className="bg-primary"
          onClick={() => router.push("/signout")}
        >
          Sign Up
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="text-primary border-primary"
          rightIcon={<FaArrowRight className="text-sm" />}
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </div>
    </Layout>
  );
};

export default SignUpOrLogin;
