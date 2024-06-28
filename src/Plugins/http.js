const pageUrl = "http://167.99.138.67:1111"

const http = {
    post: (url, data) => {
        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(data)
        }
        return new Promise(resolve => {
            fetch(pageUrl + url, options)
                .then(res => res.json())
                .then(res => {
                    resolve(res)
                })
        })
    },
    get: (url) => {
        return new Promise(resolve => {
            fetch(pageUrl + url)
                .then(res => res.json())
                .then(res => {
                    resolve(res)
                })
        })
    }
}

export default http;