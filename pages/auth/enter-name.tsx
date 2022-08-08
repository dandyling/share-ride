import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { updateProfile } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Layout } from "../../components/layout";
import { auth } from "../../firebase/firebase";

const SignUp: NextPage = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value !== "" ? null : "Please enter your name"),
    },
  });

  return (
    <Layout>
      <form
        onSubmit={onSubmit(async (values) => {
          setSubmitting(true);
          try {
            if (auth.currentUser) {
              await updateProfile(auth.currentUser, {
                displayName: values.name,
              });
              router.push("/");
            }
            setSubmitting(false);
          } catch (error: any) {
            showNotification({
              title: "Error updating user name",
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
        <TextInput
          required
          label="Please enter your name:"
          id="name"
          size="lg"
          placeholder="Name"
          classNames={{ label: "text-ferra mb-4", required: "hidden" }}
          {...getInputProps("name")}
        />
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
