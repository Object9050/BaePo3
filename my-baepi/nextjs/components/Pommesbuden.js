import Link from "next/link";

const Pommesbuden = ({ pommes }) => {
  return (
    <>
      <ul className="list-none space-y-4 text-4xl font-bold mb-3">
        {pommes &&
          pommes.data.map((pommes) => {
            return (
              <li key={pommes.id}>
                <Link href={`pommesbuden/` + pommes.id}>{pommes.attributes.Name}</Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Pommesbuden;
