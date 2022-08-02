import { useRouter } from 'next/router';

const Page1 = () => {
    const router = useRouter();
    const { id } = router.query;
    return <div>
        {typeof (id)}
        {id}
        {typeof (id) === 'string' ? id : id?.join(',')} {id?.[2]}
    </div>
}

export default Page1;
