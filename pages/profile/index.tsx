import { showNotification } from "@mantine/notifications";
import { signOut } from "firebase/auth";
import { useAtom } from "jotai";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/layout";
import { ProtectedRoute } from "../../components/protected-route";
import { loadingAtom } from "../../data/loading";
import { auth } from "../../firebase/firebase";

const Profile: NextPage = () => {
  const router = useRouter();
  const [, setLoading] = useAtom(loadingAtom);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setLoading(false);
      showNotification({
        message: "Sign out successfully",
        classNames: {
          root: "before:bg-green-500",
        },
      });
      router.push("/auth");
    } catch (error: any) {
      setLoading(false);
      showNotification({
        title: "Sign out error",
        message: error.message,
        classNames: {
          root: "before:bg-red-500",
        },
      });
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="flex flex-col items-center">
          <div
            className="w-full p-4 text-left border-b cursor-pointer text-stone-500"
            onClick={() => router.push("/profile/my-offered-rides")}
          >
            My Offered Rides
          </div>
          <div
            className="w-full p-4 text-left border-b cursor-pointer text-stone-500"
            onClick={handleSignOut}
          >
            Logout
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
