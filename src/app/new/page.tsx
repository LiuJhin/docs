import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function New() {
  const id = uuidv4();
  redirect(`/doc/${id}`);
}
