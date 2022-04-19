let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character';

const fetchData = (URL_api) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', URL_api, true);
        xhttp.onreadystatechange = (() => {
            if (xhttp.redystate === 4) {
                (xhttp.status === 2) ?
                resolve(JSON.parse(xhttp.resposeText)): reject(new Error('Error', URL_api));
            }
        });
        xhttp.send()
    });
}


// a qui va  lo que va en challenge.js




fetchData(API)
    .then(data =>{
        console.log(data.info.count);
        return fetchData(`${API}&{data.results[0].id}`);
    })
    .then(data =>{
        console.log(data.name);
        return fetchData(data.origin.url)
    })
    .then(data =>{
        console.log(data.dimencion);
    })
    .catch(err=>console.log(err))