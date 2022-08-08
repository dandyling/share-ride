import { Title } from "@mantine/core";
import { useAtom } from "jotai";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ReactCodeInput from "react-verification-code-input";
import { Layout } from "../../components/layout";
import { loadingAtom } from "../../data/loading";
import { confirmationResultAtom } from "../../data/phone-authentication";

const Verify: NextPage = () => {
  const router = useRouter();
  const [, setLoading] = useAtom(loadingAtom);
  const [confirmation] = useAtom(confirmationResultAtom);
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full h-96">
        <Title order={1} className="mb-4 text-lg text-center text-ferra">
          Please enter the code sent to your phone
        </Title>
        <ReactCodeInput
          autoFocus
          onComplete={async (value) => {
            if (confirmation) {
              setLoading(true);
              const result = await confirmation.confirm(value);
              setLoading(false);
              if (result.user.displayName) {
                router.push("/");
              } else {
                router.push("/auth/enter-name");
              }
            }
          }}
        />
      </div>
    </Layout>
  );
};

export default Verify;
