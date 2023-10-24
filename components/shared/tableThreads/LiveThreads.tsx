import ContentContainer from "@/components/shared/contentContainer/ContentContainer";
import { Threads , columns } from "./columns";
import { DataTable } from "./data-table";
import LiveContainer from "@/components/shared/boxContainer/LiveContainer";
import { dashboard } from "@/data/dashboard";

async function getData(): Promise<Threads[]> {
  const data = dashboard;
  const threads = data.Threads;

  return Object.keys(threads).map((logKey) => {
    const threadsEntry = threads[logKey as unknown as keyof typeof threads];
    return {
      id: threadsEntry.ID,
      function: threadsEntry.Function,
      user: threadsEntry.Name,
      type: threadsEntry.Type,
      context: threadsEntry.Context,
      waitTime: threadsEntry.WaitTime,
      elapsedTime: threadsEntry.ElapsedTime,
      state: threadsEntry.State,
      delete: threadsEntry.ID,
      actions: [],
    };
  });
}

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