import ContentContainer from "@/components/shared/contentContainer/ContentContainer";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import LiveContainer from "@/components/shared/boxContainer/LiveContainer";
import { getData } from "@/app/(root)/dashboard/page";

export default async function LiveThreads() {
  const data = await getData();

  return (
    <div className="text-[0.6rem] dark:border-slate-700 ">
      <ContentContainer>
        <LiveContainer title="Live Threads" logHeight="h-[auto] max-2xl:h-[35vh] dark:border-slate-700 ">
          <DataTable columns={columns} data={data} />
        </LiveContainer>
      </ContentContainer>
    </div>
  );
}
