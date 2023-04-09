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

type Order = {
    ID : number
    NumberCode: string
    Number: string
    Slug: string
}

type MainStore = {
    services: Service[] | undefined;
    filteredServices: Service[] | undefined;
    orders: Order[] | undefined
}

type User = {
    ID: number, 
    Auth: boolean, 
    Email: string, 
    Balance: number
    Token: string
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

type Country = {
    Code: string;
    Name: string;
    PhoneCode: string;
    LocalizedName: string;
  };
  