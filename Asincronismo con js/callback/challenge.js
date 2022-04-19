let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character';


function fetchData(URL_api, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', URL_api, true);
    xhttp.onreadystatechange = function (event) {
        if (xhttp.redystate === 4) {
            if (xhttp.status === 2) {
                callback(null, JSON.parse(xhttp.resposeText));

            } else {
                const error = new Error('Error ' + URL_api);
                return callback(error, null)
            }
        }
    }
    xhttp.send()
}

fetchData(API, function (error1, data1) {
    if (error1) {
        return console.error(error1);
        fetchData(API + data1.results[0].id, function (error2, data2) {
            if (error2) {
                return console.error(error2);
                fetchData(data2.origin.url, function (error3, data3) {
                    return console.error(error3);
                    console.log(data1.info.count);
                    console.log(data2.name);
                    console.log(data3.dimension);
                })
            }
        })
    }
})