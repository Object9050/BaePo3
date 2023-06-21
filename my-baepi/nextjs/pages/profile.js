import { useFetchUser } from "../lib/authContext";
import Layout from "../components/Layout";

const Profile = () => {
  const { user } = useFetchUser();

  return (
    <Layout user={user}>
      <>
        <h1 className="text-5xl font-bold">
          Hallo <span className="bg-clip-text text-orange-400">{user}</span>
          <span>👋</span>
        </h1>
      </>
    </Layout>
  );
};

export default Profile;
