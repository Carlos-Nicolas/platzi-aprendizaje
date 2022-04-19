const somethingWillHappen = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            resolve('hey')
        } else {
            reject('whops')
        }
    });
};

somethingWillHappen()
    .then(response => console.log(response))
    .catch(err => console.log(err));


const someThingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            setTimeout(() => {
                resolve('True');
            }, 2000)

        } else {
            const error = new Error ('whooops!');
            reject(error);
        };
    });
}

    someThingWillHappen2()
    .then(response => console.log(response))
    .catch(err => console.log(err))

    Promise.all([someThingWillHappen2(),somethingWillHappen()])
        .then(response => {
            console.log('array of results', respose);
        })
        .catch( err =>{
            console.log(err);
        })