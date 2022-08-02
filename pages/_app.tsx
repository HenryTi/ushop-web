import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import '../tonwa-com/css/tonwa.css';
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // @ts-ignore
        //import("bootstrap/dist/js/bootstrap");
    }, []);
    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
    </>
}

export default MyApp
