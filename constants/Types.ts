import { Guid } from "guid-typescript";

export interface RequestOptions{
    headers?: Headers,
    credentials?:RequestCredentials,
    method?: string,
    body?: any,
}
export interface Division{
    id: Guid,
    ui: Guid,
    d: number,
    cd: Date ,
    ddn: string,
    dvt: string,
    title: string,
    eii: boolean,
    ebt: boolean,
    erpls: boolean,
    erplo: boolean,
    hlar: boolean,
    hear: boolean,
    head: boolean,
    heor: boolean,
    hepy: boolean,
    hein: boolean
}