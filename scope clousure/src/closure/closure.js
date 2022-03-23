/*
closure : es la conbinacion  de una funcion  y el ambito lexicoen la cual ha sido declarada la funcion
*/


const moneyBox1 = (coins) => {
    var saveCoins = 0;
    saveCoins += coins;
    console.log(`Money box: $ ${saveCoins}`);
}


moneyBox1(5); //5
moneyBox1(10); //10

const moneyBox = () => {
    var saveCoins = 0;
    const countCoins = (coins) => {
        saveCoins += coins;
        console.log(`Money box: $ ${saveCoins}`);

    }
    return countCoins;
}

let myMoneyBox = moneyBox();

myMoneyBox(6); //6
myMoneyBox(4); //10
myMoneyBox(10); //20