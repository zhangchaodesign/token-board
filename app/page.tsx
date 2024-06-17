import DataTable from "../components/DataTable";
import data from "@/data/data";

export default function Home() {
  return (
    <div className="pt-16 px-6 pb-16">
      <DataTable data={data} />
    </div>
  );
}
