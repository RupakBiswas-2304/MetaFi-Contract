const { ethers } = require("hardhat");



const main = async () => {
    const coffeeContractFactory = await hre.ethers.getContractFactory('CoffeePortal');
    const coffeeContract = await coffeeContractFactory.deploy(
        {
            value: hre.ethers.utils.parseEther('0.1')
        }
    );

    await coffeeContract.deployed();
    
    console.log("Contract deployed to:" ,coffeeContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(coffeeContract.address);
    console.log(`Contract balance: ${hre.ethers.utils.formatEther(contractBalance)}`);

    const coffeeTxn = await coffeeContract.buyCoffee(
        "This is coffee #1",
        "Rupak",
        ethers.utils.parseEther('0.001')
    )
    await coffeeTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(coffeeContract.address);
    console.log(`Contract balance: ${hre.ethers.utils.formatEther(contractBalance)}`);

    let allcoffee = await coffeeContract.getAllCoffees();
    console.log(allcoffee);
}


const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();