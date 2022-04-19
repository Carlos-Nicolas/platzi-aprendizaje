const doSomethingAsync = () => {
    return new Promise((resolve, reject) => {
        (true) ?
        setTimeout(resolve('do something Async'), 3000):
            reject(new Error('Test Error'))
    });
}


const doSomething = async () =>{
    const someThing = await doSomethingAsync()
    console.log(someThing);
}

console.log('before');
doSomething();
console.log('after');


const anotherFunction = async() =>{
    try {
        const someThing = await doSomethingAsync();
        console.log(someThing);
    } catch (error) {
        console.log(error);
    }
}


console.log('before 1');
anotherFunction();
console.log('after 1');