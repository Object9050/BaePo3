import Layout from "../components/Layout";
import { useFetchUser } from "../lib/authContext";

export default function Home() {
  const { user } = useFetchUser();
  return (
    <Layout user={user}>
      <h1 className="font-bold text-2xl mb-4">BæPo - Bæst Pommes in Town!</h1>
      <p className="text-xl mb-4">Abschlussprojekt von Jodie Sauer im Rahmen der DevOps-Weiterbildung bei Techstarter.</p>
      <p className="text-xl">Guten Appetit!</p>
    </Layout>
  );
}
