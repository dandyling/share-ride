import { Button, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import {
  ApplicationVerifier,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useAtom } from "jotai";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import PhoneInput, {
  Value as E164Number,
} from "react-phone-number-input/input";
import { Layout } from "../../components/layout";
import {
  confirmationResultAtom,
  displayNameAtom,
} from "../../data/phone-authentication";
import { auth } from "../../firebase/firebase";

const SignUp: NextPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<E164Number>();
  const [submitting, setSubmitting] = useState(false);
  const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier>();
  const [, setConfirmation] = useAtom(confirmationResultAtom);
  const [, setDisplayName] = useAtom(displayNameAtom);
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value !== "" ? null : "Please enter your name"),
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const recaptchaVerifier = new RecaptchaVerifier(
        "submit-sign-up",
        {
          size: "invisible",
        },
        auth
      );
      setRecaptcha(recaptchaVerifier);
    }
  }, []);

  return (
    <Layout>
      <form
        onSubmit={onSubmit(async (values) => {
          setSubmitting(true);
          try {
            const confirmationResult = await signInWithPhoneNumber(
              auth,
              phoneNumber?.toString() ?? "",
              recaptcha as ApplicationVerifier
            );
            setSubmitting(false);
            if (confirmationResult) {
              setConfirmation(confirmationResult);
              setDisplayName(values.name);
              router.push("/auth/verify");
            }
          } catch (error: any) {
            showNotification({
              title: "Error creating user account",
              message: error.message,
              classNames: {
                root: "before:bg-red-500",
              },
            });
            setSubmitting(false);
          }
        })}
        className="relative flex flex-col justify-center h-full p-16 space-y-16"
      >
        <Title order={1} className="self-center">
          Sign Up
        </Title>
        <div className="space-y-4">
          <PhoneInput
            label="Phone Number"
            required
            country="MY"
            international
            withCountryCallingCode
            value={phoneNumber}
            onChange={setPhoneNumber}
            size="lg"
            placeholder="Enter phone number"
            inputComponent={TextInput as any}
          />
          <TextInput
            required
            label="Name"
            id="name"
            size="lg"
            placeholder="Name"
            {...getInputProps("name")}
          />
        </div>
        <Button
          id="submit-sign-up"
          size="lg"
          type="submit"
          className="w-full rounded-2xl bg-primary"
          rightIcon={<FaArrowRight className="text-sm" />}
          loading={submitting}
          disabled={submitting}
          loaderPosition="right"
        >
          Next
        </Button>
      </form>
    </Layout>
  );
};

export default SignUp;
