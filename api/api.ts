import client from "./client";

const Api = {
    getWordpressPasssword: (params: any) => {
        const url = "/wordpress-generator";
        return client.get(url, { params });
    },
}

export default Api;