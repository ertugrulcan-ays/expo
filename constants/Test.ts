import { RequestOptions } from "./Types";
import { router} from 'expo-router';

export const RequestHandler = {
    JSONRequest: async function (method = "POST", uri:string,data?:any, customHeaders?:Headers | boolean) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let controller = new AbortController();
        if (customHeaders != null || typeof customHeaders != undefined ) {
            if (customHeaders != true) {
                // $.each(customHeaders, (key:string, item:string) => {
                //     headers.append(key, item)
                // });
            } else {
                headers.append("Authorization", "Bearer " + sessionStorage.ftimt_);
            }
        }
        let requestOptions:RequestOptions = {
            headers: headers,
            credentials: "omit",
            method: method,
            body: "",
        }
        if (data != null || typeof data != undefined) data = JSON.stringify(data);
        if (method == "POST") {
            requestOptions.body = data;
        } else if (method == "GET") {
            delete requestOptions.body;
        } else {

        }
        let request = new Request(uri, requestOptions);
        try {
            return await fetch(request).then((response) => {
                if (response.status == 401 || response.status == 503) {
                    router.replace('/(auth)/login');
                } //Oturum açılmamış anasayfaya yönlendir.
                else {
                    return response;
                }
            }).catch((error) => {
                console.error("JSONRequest", error);
                let x = new Request(window.location.href);
                return x
            });
        } catch (e) {
            return 'null'
        }
        //return Fetch;
    },
    FormURLEncodedRequest: async function (method = "POST", uri:string, data?:any,customHeaders?:Headers | boolean) {
        let urlencoded = new URLSearchParams();
        if (data != null) {
            // $.each(data, (index, item) => {
            //     urlencoded.append(index, item)
            // });
        }
        let requestHeaders = new Headers();
        if (customHeaders == null) {
            requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        } else {
            requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            // $.each(customHeaders, (index, item) => {
            //     requestHeaders.append(index, item)
            // });
        }
        let requestOptions:RequestOptions = {
            headers: requestHeaders,
            credentials: "omit",
            method: method,
            body: method == "POST" ? urlencoded : "",
        }
        let request = await fetch(uri, requestOptions).then((response) => {
            if (response.status == 401) {
                router.replace('/(auth)/login');
             } //Oturum açılmamış anasayfaya yönlendir.
            else {
                return response;
            }
        }).catch((error) => {
            console.error("JSONRequest", error);
        });
        return request;
    }
    /*
    FormDataRequest: async function (method = "POST", uri, data, customHeaders) {
        let formData = new FormData();
        let headers = new Headers();
        if (!V3.Objects.IsObjectNullOrEmpty(data) && !(data instanceof FormData)) {
            $.each(data, (key, item) => {
                formData.append(key.toString(), item)
            })
        } else {
            formData = data;
        }
        if (!V3.Objects.IsObjectNullOrEmpty(customHeaders)) {
            if (customHeaders != true) {
                $.each(customHeaders, (key, item) => {
                    headers.append(key, item)
                });
            } else {
                headers.append("Authorization", "Bearer " + sessionStorage.ftimt_);
            }
        }
        let requestOptions = {
            method: method,
            body: formData,
            credentials: "omit",
        }
        if (method == 'GET') delete requestOptions.body;
        let request = new Request(uri, requestOptions)
        let Fetch = await fetch(request).then((response) => {
            if (response.status == 401 || response.status == 503) {
                window.location.href = "/index.html";
            } //Oturum açılmamış anasayfaya yönlendir.
            else {
                return response;
            }
        }).catch((error) => {
            console.error("FormDataRequest", error);
        });
        return Fetch;
    }
    */
};