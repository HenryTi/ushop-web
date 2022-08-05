import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from 'helpers/services';
import { FA } from 'tonwa-com';

type LoginValues = {
    username: string;
    password: string;
    apiError?: string;
};

interface Props {
    backurl: string;
}

export default function Login({ backurl }: Props) {
    let router = useRouter();
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    let formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, setError, formState, clearErrors } = useForm<LoginValues>(formOptions);
    const { errors } = formState;
    async function onSubmit(data: any) {
        let { username, password } = data;
        clearErrors('apiError');
        let ret = await userService.login(username, password);
        if (ret as any === '') {
            setError("apiError", { message: 'user or password error!' });
            return;
        }
        router.push(backurl);
    }
    function Input({ name, type, label }: { label: string; name: string; type?: string; }) {
        let err = (errors as any)[name];
        return <>
            <label>{label}</label>
            <input name={name} type={type ?? 'text'} {...register(name as any)} className={`form-control ${err ? 'is-invalid' : ''}`} />
            <Error name={name} />
        </>;
    }
    function Error({ name }: { name: string; }) {
        let err = (errors as any)[name];
        if (!err) return null;
        return <div className="invalid-feedback">{err?.message}</div>;
    }
    function RowInput({ name, type, label }: { label: string; name: string; type?: string; }) {
        return <div className="mb-3">
            <Input name={name} type={type} label={label} />
        </div>;
    }
    function Alert({ name }: { name: string; }) {
        let err = (errors as any)[name];
        if (!err) return null;
        return <div className="alert alert-info text-danger">
            <FA name="exclamation-circle" className="me-3" />
            {err?.message}
        </div>;
    }
    function Submit() {
        return <button disabled={formState.isSubmitting} className="btn btn-primary">
            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Login
        </button>
    }
    return <div className="container">
        <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 mt-5">
            <div className="alert alert-info">
                Username: test<br />
                Password: test
            </div>
            <div className="card">
                <h4 className="card-header">Next.js JWT Login Example</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <RowInput name="username" label="UserName" />
                        <RowInput name="password" label="Password" type="password" />
                        <Alert name="apiError" />
                        <Submit />
                    </form>
                </div>
            </div>
        </div>
        <div className="row mb-3">
            <div className="offset-sm-2">
                <button className="btn btn-link" onClick={() => alert('forget')}>
                    忘记密码
                </button>
                <button className="btn btn-link" onClick={() => alert('register')}>
                    注册账号
                </button>
            </div>
        </div>
        <div className="flex-fill" />
        <div className="flex-fill" />
    </div>;
}

export const getServerSideProps: GetServerSideProps = async ({ query }): Promise<{ props: Props }> => {
    return {
        props: {
            backurl: (query['backurl'] ?? '/') as string,
        }
    };
}
