export default function Login() {
    return <div className="container">
        <div className="text-center p-3 fs-5 text-primary">登录</div>
        <form>
            <div className="row mb-3">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" id="inputEmail3" />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3" />
                </div>
            </div>
            <div className="row mb-3">
                <div className="offset-sm-2 col-sm-10">
                    <button type="submit" className="btn btn-primary" id="inputPassword3">
                        Submit
                    </button>
                </div>
            </div>
        </form>
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

/*
<Form BandTemplate={FormBandTemplate1}>
<BandString label="登录账号" name="username"
    placeholder="手机/邮箱/用户名" rule={ruleIsRequired}
    maxLength={100} />
<BandPassword label="密码" name="password"
    placeholder="密码" rule={ruleIsRequired}
    maxLength={100} />
<Band>
    <FormErrors />
</Band>
<Band contentContainerClassName="text-center my-3">
    <Submit onSubmit={onSubmit}><div className='mx-5'>登录</div></Submit>
</Band>
</Form>
*/