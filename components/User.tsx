import { userService } from "helpers/services";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function User() {
    let router = useRouter();
    let [userObj, setUserObj] = useState(undefined);
    useEffect(() => {
        userService.load();
        setUserObj(userService.user);
    }, []);
    if (!userObj) {
        return <Link href={'/auth/login?backurl=' + router.route}>
            <a className="btn btn-link">
                login
            </a>
        </Link>;
    }
    let { user } = userObj;
    return <Link href="/auth/user">
        {user}
    </Link>;
}

export default User;
