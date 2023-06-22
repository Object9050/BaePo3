import Link from "next/link";
// Creates a map of pommes.data and iterates through the map
// creating links to all the Pommesbuden using the id as unique key
const Pommesbuden = ({ pommes }) => {
  return (
    <>
      <ul className="list-none space-y-4 text-2xl md:text-3xl lg:text-3xl font-bold mb-3">
        {pommes &&
          pommes.data.map((pommes) => {
            return (
              <li key={pommes.id}>
                <Link href={`pommesbuden/` + pommes.id}>
                  {pommes.attributes.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Pommesbuden;
