import { userService } from "helpers/services";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function () {
    let router = useRouter();
    let [userObj, setUserObj] = useState(undefined);
    useEffect(() => {
        userService.load();
        setUserObj(userService.user);
    }, [userService]);
    if (userObj === null) {
        if (typeof window !== 'undefined') {
            router.push('/auth/login?backurl=' + router.route);
        }
        return;
    }
    if (userObj === undefined) {
        return;
    }
    let { user } = userObj;
    function onClick() {
        userService.logout();
        setUserObj(null);
        router.back();
    }
    return <span>
        {user}
        <button onClick={onClick}>logout</button>
    </span>;
}
