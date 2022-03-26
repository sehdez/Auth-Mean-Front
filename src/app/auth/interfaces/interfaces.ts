export interface AuthResponse {
    ok    : boolean;
    msg?  : string;
    uid?  : string;
    email?: string,
    name? : string;
    token?: string;
}

export interface Usuario{
    uid   : string;
    nombre: string;
    email : string;
}