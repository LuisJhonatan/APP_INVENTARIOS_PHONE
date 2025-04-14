import SearchProduct from "@/app/_section/SearchProduct";
import Summary from "@/app/_section/Summary";

export default function Home() {
  return (
    <main className="p-4 md:p-8">
      <Summary />
      <SearchProduct />
    </main>
  );
}
