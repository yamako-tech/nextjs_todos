import Head from "next/head";

export default function Layout({ children, title = "Default title"}) {
    return (
        <div className="flex justify-center flex-col min-h-screen text-blue-800 font-mono bg-indigo-50">
            <Head>
                <title>{title}</title>
            </Head>
            <main className="flex flex-1 justify-center items-center w-screen flex-col">
                {children}
            </main>
            <footer className="w-full h-6 flex justify-center items-center text-blue-800 text-sm">
                @asktech 2021
            </footer>
        </div>
    )
}