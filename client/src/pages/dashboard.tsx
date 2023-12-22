//Karan write code
//@ts-ignore
import { ConnectButton } from "@rainbow-me/rainbowkit";
import PayCard from "../components/cards/PayCard";
import FriendCard from "../components/cards/FriendCard";
import CashbackCard from "../components/cards/CashbackCard";
import HistoryCard from "../components/cards/HistoryCard";

export default function Dashboard() {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-2 md:px-6">
        <header className="mb-4 flex items-center justify-between py-4 md:py-8">
          <div className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl">
            <a href="/" className="cursor-pointer">
              ModePay
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <ConnectButton />
          </div>
        </header>

        <section className="mt-10 mx-10">
          <div className="flex items-center">
            <div className="flex items-center justify-around flex-1 gap-x-20 ">
              <PayCard />
              <FriendCard />
              <CashbackCard />
            </div>
          </div>
          <div className="mt-10">
            <HistoryCard />
          </div>
        </section>
      </div>
    </div>
  );
}
