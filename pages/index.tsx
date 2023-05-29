import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import MintModule from "../components/MintModule";
import { useContractRead } from "wagmi";
import dynamic from "next/dynamic";
import { useTreasuryBalance } from "../hooks/useTreasuryBalance";
import TopNfts from "../components/TopNfts";

interface NavigationItem {
  name: string;
  href: string;
}

const Home: NextPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { treasuryBalance, isError, isLoading } = useTreasuryBalance();

  const [treasuryText, setTreasuryText] = useState("Treasury");
  useEffect(() => {
    !isLoading &&
      !isError &&
      treasuryBalance &&
      setTreasuryText(`Treasury ${treasuryBalance.toString()} ETH`);
  }, [treasuryBalance, isError, isLoading]);

  const navigation: NavigationItem[] = [
    { name: "Mint", href: "#mint" },
    { name: "Trending", href: "#trending" },
    // { name: "Features", href: "#features" },
    // { name: "Docs", href: "#docs" },
    { name: treasuryText, href: "https://juicebox.money/v2/p/465" },
  ];

  return (
    <div className="bg-white">
      <Head>
        <title className="pt-20">Juicebox Cards</title>
        <meta
          content="Keep track of your favorite Juicebox Projects right inside your wallet."
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Juicebox Cards</span>
              <Image
                className="h-8 w-auto"
                src="/juicebox-black.png"
                alt="juicebox logo"
                width={54}
                height={72}
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <ConnectButton accountStatus="address" />
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Juicebox</span>
                <Image
                  className="h-8 w-auto"
                  src="/juicebox-black.png"
                  alt="juicebox logo"
                  width={54}
                  height={72}
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6  divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <ConnectButton accountStatus="address" />
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate pt-14">
        {/* <svg
          className="absolute inset-0 -z-10 h-full w-[120%] left-[-10%] right-[-10%] stroke-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="22%"
                style={{ stopColor: "rgba(255, 126, 32, 0)" }}
              />
              <stop offset="34%" style={{ stopColor: "rgba(255, 126, 32, 255)" }} />
              <stop
                offset="65%"
                style={{ stopColor: "rgba(255, 126, 32, 0)" }}
              />
            </linearGradient>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="55" />
            </filter>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#gradient)"
            filter="url(#blur)"
          />
        </svg> */}

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pt-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:pt-40 lg:pb-20">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto self-start">
            <h1 className="mt-30 max-w text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Juicebox Cards
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Track your favorite Juicebox Projects inside your wallet.
            </p>
            <MintModule className="flex flex-col grow mt-20" />
          </div>
          <div className="flex justify-center mt-16 sm:mt-24 lg:mt-0 lg:ml-20 sm:ml-0 lg:flex-shrink-0 lg:flex-grow">
            <Image
              className=""
              src={"/iphone_hero.png"}
              width={318}
              height={622}
              alt="screenshot"
            />
          </div>
        </div>
        <div
          id="trending"
          className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:flex lg:justify-center lg:gap-x-10 lg:px-8"
        >
          <TopNfts />
        </div>
      </div>
      <footer>
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 sm:flex-row">
          <div className="sm:px-6">
            <a href="https://github.com/nnnnicholas/juicebox-project-cards">
              Contract Github
            </a>
          </div>
          <div className="sm:px-6">
            <a href="https://github.com/nnnnicholas/juicebox-project-cards-frontend">
              Frontend Github
            </a>
          </div>
          <div className="sm:px-6">
            <a href="https://juicebox.money/v2/p/465">Juicebox Project</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
