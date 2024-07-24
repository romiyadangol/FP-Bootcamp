export function request(method, url, data) {
    switch (method) {
        case 'POST':
            return handlePost(url,data);

        case 'GET':
            return handleGet(url);
    }
}

function handlePost(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('ResponseData:', data);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
        return serialization(data);
    });

}

function handleGet(url){
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log('ResponseData:', data);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
        return serialization(data);
    });
}

function serialization(data) {
        const finalMapData = data.map(item => {
            const mapData = {};
            mapData['email'] = item.email;
            mapData['password'] = item.password;
            return mapData;
        });
        return finalMapData;
}
