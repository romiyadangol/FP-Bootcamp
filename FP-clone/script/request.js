export async function request(method, url, data) {
    try {
        switch (method) {
            case 'POST':
                return await handlePost(url, data);

            case 'GET':
                return await handleGet(url);

            case 'DELETE':
                return await handleDelete(url);
        }
    } catch (error) {
        console.error('Error:', error);
        return serialization([]);
    }
}

async function handlePost(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const dataResponse = await response.json();
        console.log('ResponseData:', dataResponse);
        return serialization(dataResponse);
    } catch (error) {
        console.error('Error:', error);
        return serialization([data]);
    }

}

async function handleGet(url){
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('ResponseData:', data);
        return serialization(data);
    } catch (error) {
        console.error('Error:', error);
        return serialization([]);
    }
}

async function handleDelete(url){
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Response Deleted:', data);
        return serialization(data);
    } catch (error) {
        console.error('Error', error);
        return serialization([]);
    }
}

function serialization(data) {
    let finalMapData;
    if(Array.isArray(data)){
        finalMapData = data.map((datum) => {
            const mapData = {};
            mapData['userId'] = datum['userId']
            mapData['blogTitle'] = datum['title']
            mapData['blogDescription'] = datum['body']
            return mapData;
        });
    }
    else{
        finalMapData = {
            "userID" : data.userID,
            "blogTitle" : data.title,
            "blogDescription" : data.body
        }
    }
    return finalMapData;    
}
