type Service = {
    ID: number;
    Count: number;
    Slug: string;
    Price: number;
    Country: string;
    Prefix: string;
    LocalizedName: string;
    LocalizedDescription: string;
    Uid: string;
}

type ServiceStore = {
    services: Service[] | undefined;
    filteredServices: Service[] | undefined;
}

type User = {
    ID: number, 
    Auth: boolean, 
    Email: string, 
    Balance: number
}

type Login = {
    email: string
    password: string
}
type Register = {
    email: string
    password: string
    passwordRepeat: string
}