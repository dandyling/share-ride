import { Button, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { Layout } from "../../components/layout";
import { auth } from "../../firebase/firebase";
import { EmailRegex, PasswordRegex } from "../../utils.ts/regex";

const Login: NextPage = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
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
          setSubmitting(true);
          try {
            const user = await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            if (user.user) {
              router.push("/");
            }
            setSubmitting(false);
          } catch (error: any) {
            showNotification({
              title: "Error signing in",
              message: error.message,
              classNames: {
                root: "before:bg-red-500",
              },
            });
            setSubmitting(false);
          }
        })}
        className="flex flex-col justify-around h-full p-16 space-y-16"
      >
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center w-full space-y-4">
            <Title order={1}>Login</Title>
            <AiFillCar className="my-4 text-9xl text-primary" />
          </div>
          <div className="flex flex-col w-full space-y-4">
            <TextInput
              id="email-address"
              size="lg"
              placeholder="Email address"
              className="w-full"
              {...getInputProps("email")}
            />
            <PasswordInput
              id="password"
              placeholder="Password"
              size="lg"
              className="w-full"
              {...getInputProps("password")}
            />
          </div>
          <Button
            size="lg"
            type="submit"
            className="w-full rounded-2xl bg-primary"
            loading={submitting}
            disabled={submitting}
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
