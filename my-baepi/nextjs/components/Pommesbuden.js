import Link from "next/link";

const Pommesbuden = ({ pommes }) => {
  return (
    <>
      <ul className="list-none space-y-4 text-4xl font-bold mb-3">
        {pommes &&
          pommes.data.map((pommes) => {
            return (
              <li key={pommes.id}>
                <Link href={`pommesbuden/` + pommes.attributes.slug}>{pommes.attributes.title}</Link>
              </li>
            );
          })
        }
      </ul>
    </>
  );
};

export default Pommesbuden;
