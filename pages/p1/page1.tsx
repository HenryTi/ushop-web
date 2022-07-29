import { useState } from 'react'
import Layout from 'components/Layout'

const Page1 = () => {
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
    </Layout>
}

export default Page1;