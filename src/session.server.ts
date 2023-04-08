import { createCookieSessionStorage, redirect } from "solid-start";

const storage = createCookieSessionStorage({
    cookie: {
        name: "session",
        secure: false,
        secrets: ["adwdq32d32"],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true
    }
});

export async function getUserToken(request: Request): Promise<User | null> {
    const cookie = request.headers.get("Cookie") ?? ""
    const session = await storage.getSession(cookie);
    const userToken = session.get("userToken");
    if (!userToken) return null;
    return userToken
}

export async function createUserSession(userToken: string, redirectTo: string) {
    const session = await storage.getSession();
    session.set("userToken", userToken);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session)
        }
    });
}

export async function getUser(request: Request): Promise<User | null> {
    const userToken = await getUserToken(request)
    const userResponse = await fetch(
        "https://api.smsvibe.ru/api/user/getUserInfo?token=" + userToken);

    const user = await userResponse.json();
    console.log(user)
    return user
}


export async function login({ email, password }: Login) {
    const loginParams = new URLSearchParams();

    loginParams.append("email", email);
    loginParams.append("password", password);

    const loginData = {
        email: email,
        password: password,
    };

    const options: any = {
        method: "POST",
        credentials: 'include',
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(loginData)
    };

    let response = await fetch(
        "https://api.smsvibe.ru/api/auth/login",
        options
    );

    if (response.ok) {
        var authResponse = await response.json();

        return authResponse
    } else {
        return false
    }
}