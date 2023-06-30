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
    { name: "How Cards Work", href: "#how" },
    { name: "Dev Resources", href: "#resources" },
    { name: treasuryText, href: "https://juicebox.money/v2/p/465" },
  ];

  return (
    <div className="bg-white">
      <Head>
        <title>Juicebox Cards</title>
        <meta
          content="Keep track of your favorite Juicebox Projects right inside your wallet."
          name="description"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
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
                className="text-sm font-semibold leading-6 text-gray-800"
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

      <div className="relative isolate pt-24">
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

        <div className="mx-auto lg:flex lg:items-center max-w-7xl px-6 pb-12 pt-10 sm:pt-32 lg:gap-x-10 lg:px-8 lg:pt-30 lg:pb-15">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto self-start">
            <h1 className="mt-30 max-w text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Juicebox Cards
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Track your favorite Juicebox Projects inside your wallet.
            </p>
            <MintModule className="flex flex-col grow items-center mt-6 lg:mt-20 sm:items-stretch" />
          </div>
          <div className="relative mt-16 h-[320px] lg:h-[600px] sm:mt-24 lg:mt-0 lg:ml-16 sm:ml-0 lg:flex-shrink-0 lg:flex-grow">
            <Image
              className=""
              src={"/iphone_hero.png"}
              // width={318}
              // height={622}
              layout="fill"
              objectFit="scale-down"
              objectPosition="center"
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
        <div
          id="how"
          className="flex flex-col items-center mx-auto max-w-7xl px-6 pb-0 sm:pb-10 lg:gap-x-10 lg:px-8"
        >
          <h2 className="self-start mb-14 sm:mb-20">How Cards Work</h2>
          <div className="flex flex-col items-center sm:flex-row mb-14">
            <div className=" mb-4 sm:mr-8 sm:mb-0 lg:mr-16">
              <Image
                src="/p1.png"
                width={303}
                height={164}
                alt="juicebox projects"
              />
            </div>
            <div className="w-[340px] sm:ml-8 lg:ml-16">
              <h3>Every Juicebox project is an NFT</h3>
              <div>
                Whoever owns the NFT controls the project. They can set cycles
                and configure the project’s metadata.
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center sm:flex-row mb-14">
            <div className="w-[340px] sm:mr-8 lg:mr-16 order-last sm:order-first">
              <h3>Project owners can set their NFT’s metadata</h3>
              <div>
                Projects get onchain SVG metadata by default. Project owners can
                set custom colors, upload static metadata like an image or GIF,
                or use their own metadata contract.
              </div>
            </div>
            <div className=" mb-4 sm:ml-8 lg:ml-16 sm:mb-0">
              <Image
                src="/p2.png"
                width={328}
                height={148}
                alt="juicebox projects"
              />
            </div>
          </div>
          <div className="flex flex-col items-center sm:flex-row mb-14 ">
            <div className="mb-4 sm:mb-0 sm:mr-8 lg:mr-16">
              <Image
                src="/p3.png"
                width={208}
                height={153}
                alt="juicebox projects"
              />
            </div>
            <div className="w-[340px] sm:ml-8 lg:ml-20">
              <h3>Juicebox Cards are NFT Editions</h3>
              <div>
                Juicebox Cards inherit their corresponding project’s metadata.
                Keep track of your favorite projects inside your wallet. When
                projects update their metadata, all Juicebox Cards update too.
              </div>
            </div>
          </div>
        </div>
        <div
          id="resources"
          className="mx-auto max-w-7xl px-6 pb-12 pt-10 sm:pt-32 lg:gap-x-10 lg:px-8 lg:pt-30 lg:pb-15"
        >
          <h2 className="pb-4">Developer Resources</h2>
          <div className="flex flex-col items-center pb-12 pt-4 lg:flex-row lg:justify-between">
            <div className="pt-4 pb-10 lg:pt-0 lg:pb-0 lg:w-[45%]">
              <h4 className="pb-2">Customize your project&apos;s metadata</h4>
              <div className="text-xl">
                To change your project&apos;s NFT theme colors, visit your
                project&apos;s{" "}
                <a className="underline" href="https://juicebox.money">
                  Juicebox.Money
                </a>{" "}
                settings page, under the &quot;Project NFT theme&quot; tab.
              </div>
            </div>
            <div className="lg:w-[45%]">
              <h4 className="pb-2">Create your own metadata contract</h4>
              <div className="text-xl">
                Consult the{" "}
                <a
                  className="underline"
                  href="https://docs.juicebox.money/dev/extensions/juice-token-resolver/"
                >
                  NFT Resolver Docs
                </a>{" "}
                which include boilerplate code to get you started building your
                own metadata contract.
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="flex flex-col items-center justify-center py-12 bg-gray-100 sm:flex-row">
          <div className="sm:px-6">
            <a href="https://etherscan.io/address/0x78a975a504404e1bf94ff3982f048191fabe4f2c">
              Etherscan
            </a>
          </div>
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
            <a href="https://docs.juicebox.money/dev/extensions/juice-token-resolver/tokenuriresolver/">
              Docs
            </a>
          </div>
          <div className="sm:px-6">
            <a href="https://juicebox.money/v2/p/465">Metadata Treasury</a>
          </div>
          <div className="sm:px-6">
            <a href="https://twitter.com/intent/tweet?text=@nnnnicholas%20jb%20cards%20bug%20report:">
              Report Bug
            </a>
          </div>
          <div className="sm:px-6">
            <a href="https://discord.gg/juicebox">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
