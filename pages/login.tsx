import { Button, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Layout } from "../components/layout";
import { auth } from "../firebase/firebase";
import { EmailRegex, PasswordRegex } from "../utils.ts/regex";

const Login: NextPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
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
          setIsSubmitting(true);
          try {
            const user = await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            if (user.user) {
              router.push("/");
            }
            setIsSubmitting(false);
          } catch (error: any) {
            showNotification({
              title: "Error creating user account",
              message: error.message,
              classNames: {
                root: "before:bg-red-500",
              },
            });
            setIsSubmitting(false);
          }
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
            {...getInputProps("email")}
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
            loading={isSubmitting}
            disabled={isSubmitting}
            loaderPosition={"right"}
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
