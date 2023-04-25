import readingRecords from "./readingRecords";
import type { GetServerSidePropsContext } from "next";
async function history(req: GetServerSidePropsContext) {
  readingRecords(req);
}
export default history;
