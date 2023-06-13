import { useFetchUser } from "../lib/authContext";
import Layout from "../components/Layout";

const Profile = () => {
  const { user1, loading } = useFetchUser();

  return (
    <Layout user1={user1}>
      <>
        <h1 className="text-5xl font-bold">
          Hallo <span className="bg-clip-text text-orange-400">{user1}</span>
          <span>👋</span>
        </h1>
      </>
    </Layout>
  );
};

export default Profile;
