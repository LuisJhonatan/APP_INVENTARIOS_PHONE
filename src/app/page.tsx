import SearchProduct from "@/components/section/home/SearchProduct";
import Summary from "@/components/section/home/Summary";

export default function Home() {
  return (
    <main className="p-4 md:p-8">
      <Summary />
      <SearchProduct />
    </main>
  );
}
