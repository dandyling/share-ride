import { Button, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextPage } from "next";
import { FaArrowRight } from "react-icons/fa";
import { Layout } from "../components/layout";
import { EmailRegex, PasswordRegex } from "../utils.ts/regex";

const Login: NextPage = () => {
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        EmailRegex.test(value) ? null : "Please enter a valid email address",
      password: (value) =>
        PasswordRegex.test(value)
          ? null
          : "Password should consist of minimum eight characters, with at least one letter and one number:",
    },
  });
  return (
    <Layout>
      <form
        onSubmit={onSubmit(async (values) => {
          console.log({ values });
        })}
        className="flex flex-col justify-between h-full px-8 py-16"
      >
        <Title order={1} className="self-center">
          Login
        </Title>
        <div className="space-y-4">
          <TextInput
            id="email-address"
            size="lg"
            placeholder="Email address"
            {...getInputProps("username")}
          />
          <PasswordInput
            id="password"
            placeholder="Password"
            size="lg"
            {...getInputProps("password")}
          />
          <Button
            size="lg"
            type="submit"
            className="w-full bg-primary"
            rightIcon={<FaArrowRight className="text-sm" />}
          >
            Login
          </Button>
        </div>
        <Button variant="white">Forgot Password</Button>
      </form>
    </Layout>
  );
};

export default Login;
