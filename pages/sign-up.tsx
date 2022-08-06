import { Button, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Layout } from "../components/layout";
import { auth } from "../firebase/firebase";
import { EmailRegex, PasswordRegex } from "../utils.ts/regex";

const SignUp: NextPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touchedConfirm, setTouchedConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      email: "",
      name: "",
      password,
      confirmPassword,
    },
    validate: {
      email: (value) =>
        EmailRegex.test(value) ? null : "Please enter a valid email address",
      name: (value) => (value !== "" ? null : "Please enter your name"),
    },
  });

  return (
    <Layout>
      <form
        onSubmit={onSubmit(async (values) => {
          const data = { ...values, password, confirmPassword };
          setIsSubmitting(true);
          try {
            const user = await createUserWithEmailAndPassword(
              auth,
              data.email,
              data.password
            );
            if (user) {
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
        className="relative flex flex-col justify-between h-full px-8 py-16"
      >
        <Title order={1} className="self-center">
          Sign Up
        </Title>
        <div className="space-y-4">
          <TextInput
            required
            id="email-address"
            size="lg"
            placeholder="Email address"
            {...getInputProps("email")}
          />
          <TextInput
            required
            id="name"
            size="lg"
            placeholder="Name"
            {...getInputProps("name")}
          />
          <PasswordInput
            required
            id="password"
            placeholder="Password"
            size="lg"
            error={
              PasswordRegex.test(password)
                ? null
                : "Password should consist of minimum eight characters, with at least one letter and one number:"
            }
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <PasswordInput
            required
            id="confirm-password"
            placeholder="Confirm Password"
            size="lg"
            value={confirmPassword}
            onChange={(e) => {
              if (!touchedConfirm) {
                setTouchedConfirm(true);
              }
              setConfirmPassword(e.currentTarget.value);
            }}
            error={
              touchedConfirm && password !== confirmPassword
                ? "Reconfirm password must match"
                : ""
            }
          />
          <Button
            size="lg"
            type="submit"
            className="w-full bg-primary"
            rightIcon={<FaArrowRight className="text-sm" />}
            loading={isSubmitting}
            disabled={isSubmitting}
            loaderPosition="right"
          >
            Sign Up
          </Button>
        </div>
        <Button variant="white">Forgot Password</Button>
      </form>
    </Layout>
  );
};

export default SignUp;
