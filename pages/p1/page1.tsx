import { useState } from 'react'
import Layout from 'components/Layout'
import { getUqServer } from 'uq-app';
import { Cookies } from 'next/dist/server/web/spec-extension/cookies';

interface Props {
    data: any;
}

const Page1 = ({ data }: Props) => {
    let [count, setCount] = useState(0);
    function onClick() {
        setCount(count + 1);
    }
    return <Layout title='page1'>
        <div>
            page1 {count} <button onClick={onClick}>click</button>
        </div>
        <div>
            baseUrl . a  n bb ok
        </div>
        <div className='m-3 border p-3'>
            border
        </div>
        <div>
            {JSON.stringify(data)}
        </div>
    </Layout>
}

export async function getServerSideProps({ res, req }: { res: any; req: any; }): Promise<{ props: Props }> {
    let uqServer = await getUqServer();
    let { BzWorkshop } = uqServer.uqs;
    let ret = await BzWorkshop.$getUnitTime.query({});
    res.setHeader("set-cookie", `yourParameter=b; path=/; samesite=lax; httponly; `)
    return {
        props: {
            data: {
                a: 1,
                b: 2,
                title: uqServer.title,
                loaded: await uqServer.load(),
                uq: BzWorkshop.$name,
                unitTime: ret,
            }
        }, // will be passed to the page component as props
    }
}

export default Page1;