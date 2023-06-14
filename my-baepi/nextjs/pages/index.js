import Layout from "../components/Layout";
import { useFetchUser } from "../lib/authContext";

export default function Home() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user}>
      <h1 className="font-bold text-2xl">BaePo - Best Pommes in Town!</h1>
      <p className="text-xl">Abschlussprojekt von Jodie Sauer im Rahmen der Weiterbildung zum DevOps-Engineer bei Techstarter.</p>
      <p className="text-xl">Guten Appetit!</p>
    </Layout>
  );
}
