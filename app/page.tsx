import { DataTable } from "@/components/DataTable";
import { ToolBar } from "@/components/ToolBar";
import data from "@/data/data";

export default function Home() {
  return (
    <div className="">
      <ToolBar classes="fixed top-16 left-0 px-6 z-20 w-full" />
      <DataTable data={data} classes="absolute top-40 px-6 pb-4" />
    </div>
  );
}
