import ServerLayout from "../base/ServerLayout";
import SearchClientLayout from "./SearchClientLayout";
import { SearchLayoutProps } from "./props";

export default function SearchServerLayout(props: SearchLayoutProps) {
  return (
    <ServerLayout translations={{ product: "misc/product" }}>
      <SearchClientLayout {...props} />
    </ServerLayout>
  );
}
