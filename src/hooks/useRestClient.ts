


export function useRestClient() {

    
    async function get(url: string, body) {
        const req = fetch(url, {
            method: "GET",
            headers: {
                content: "application/json"
            },
            body: body
        })
        const res = (await req).json()
        return res 
    }

    
    async function post(url: string, body) {
        const req = fetch(url, {
            method: "POST",
            headers: {
                content: "application/json"
            },
            body: body
        })
        const res = (await req).json()
        return res
    }

    const exchange = (method: string, url: string, body?) => {
        if (method === "POST") {
            return post(url, body)
        } else if (method === "GET") {
            return get(url, body)
        }
    }

    return { exchange }

}