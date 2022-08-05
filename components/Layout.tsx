import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { EasyDate, LMR } from 'tonwa-com'
import User from './User'

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header className="bg-light border-bottom p-2">
            <LMR>
                <Link href="/" className='btn btn-link'>home</Link>
                <span >Header here</span>
                <span className="text-center flex-fill"><EasyDate date={Date.now() / 1000} /></span>
                <User />
            </LMR>
        </header>
        <div className="container">
            {children}
        </div>
        <footer>
            <hr />
            <span>I am here to stay (Footer)</span>
        </footer>
    </div>
)

export default Layout
