import { updateProfile } from "firebase/auth";
import { useAtom } from "jotai";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ReactCodeInput from "react-verification-code-input";
import { Layout } from "../../components/layout";
import {
  confirmationResultAtom,
  displayNameAtom,
} from "../../data/phone-authentication";
import { loadingAtom } from "../../data/loading";

const Verify: NextPage = () => {
  const router = useRouter();
  const [, setLoading] = useAtom(loadingAtom);
  const [confirmation] = useAtom(confirmationResultAtom);
  const [displayName] = useAtom(displayNameAtom);
  return (
    <Layout>
      <div className="flex items-center justify-center w-full h-96">
        <ReactCodeInput
          onComplete={async (value) => {
            if (confirmation) {
              setLoading(true);
              const result = await confirmation.confirm(value);
              await updateProfile(result.user, { displayName });
              setLoading(false);
              if (result.user) {
                router.push("/");
              }
            }
          }}
        />
      </div>
    </Layout>
  );
};

export default Verify;
