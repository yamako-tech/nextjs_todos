import Head from "next/head";

export default function Layout({ children, title = "Default title"}) {
    return (
        <div className="flex justify-center flex-col min-h-screen text-white font-mono bg-green-900">
            <Head>
                <title>{title}</title>
            </Head>
            <main className="flex flex-1 justify-center items-center w-screen flex-col">
                {children}
            </main>
            <footer className="w-full h-6 flex justify-center items-center text-yellow-300 text-sm">
                @asktech 2021
            </footer>
        </div>
    )
}