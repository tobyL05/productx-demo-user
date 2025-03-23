


export function useRestClient() {

    
    async function get(url: string) {
        const req = fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        })
        const res = (await req).json()
        return res 
    }

    
    async function post(url: string, body) {
        const req = fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const res = (await req).json()
        return res
    }

    const exchange = (method: string, url: string, body?) => {
        if (method === "POST") {
            return post(url, body)
        } else if (method === "GET") {
            return get(url)
        }
    }

    return { exchange }

}