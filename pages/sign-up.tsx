import { Button, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextPage } from "next";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Layout } from "../components/layout";
import { EmailRegex, PasswordRegex } from "../utils.ts/regex";

const SignUp: NextPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touchedConfirm, setTouchedConfirm] = useState(false);
  const { onSubmit, getInputProps, setFieldError } = useForm({
    initialValues: {
      username: "",
      name: "",
      password,
      confirmPassword,
    },
    validate: {
      username: (value) =>
        EmailRegex.test(value) ? null : "Please enter a valid email address",
      name: (value) => (value !== "" ? null : "Please enter your name"),
      password: (value) =>
        PasswordRegex.test(value)
          ? null
          : "Password should consist of minimum eight characters, with at least one letter and one number:",
      confirmPassword: (value) =>
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
        className="relative flex flex-col justify-between h-full px-8 py-16"
      >
        <Title order={1} className="self-center">
          Sign Up
        </Title>
        <div className="space-y-4">
          <TextInput
            id="email-address"
            size="lg"
            placeholder="Email address"
            {...getInputProps("username")}
          />
          <TextInput
            id="name"
            size="lg"
            placeholder="Name"
            {...getInputProps("name")}
          />
          <PasswordInput
            id="password"
            placeholder="Password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            id="confirm-password"
            placeholder="Confirm Password"
            size="lg"
            value={confirmPassword}
            onChange={(e) => {
              if (!touchedConfirm) {
                setTouchedConfirm(true);
              }
              setConfirmPassword(e.target.value);
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
