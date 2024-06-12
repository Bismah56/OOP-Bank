#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let count = 1;

//Creating a customer class
class customerInfo {
    FirstName : string;
    LastName : string;
    Age : number;
    Gender : string;
    MobileNo : number;
    CNIC : string;
    Balance : number;
    Pin_Code : number;              //which user will decide & input while creating his/her account
    Account_Title : string;
    IBAN : string

    constructor(first:string,last:string,age:number,gender:string,mobileNo:number,cnic:string,bal:number,PIN:number){
        this.FirstName = first;
        this.LastName = last;
        this.Age = age;
        this.Gender = gender;
        this.MobileNo = mobileNo;
        this.CNIC = cnic;
        this.Balance = bal;
        this.Pin_Code = PIN;
        this.Account_Title = first.concat(" ",last).toUpperCase();
        this.IBAN = `PKOOP 01034695844001${count++}`;
    };
};

//Creating an interface 
interface Bankaccount {          //Declaring methods in interface
    CreateAccount(first:string,last:string,age:number,gender:string,mobileNo:number,cnic:string,bal:number,PIN:number):void;
    DebitAmount(pin:number,Amount:number):void;
    CreditAmount(pin:number,Amount:number):void;
    Accountdetails(password:string):void;
};

//Creating a myBank class which implements the above interface
class myBank implements Bankaccount{
    AllAccounts : customerInfo[];

    constructor(){
        this.AllAccounts = [];
    };

    //Implementing all methods
    CreateAccount(first:string,last:string,age:number,gender:string,mobileNo:number,cnic:string,bal:number,PIN:number){
        let customerAcc = new customerInfo(first,last,age,gender,mobileNo,cnic,bal,PIN);
        this.AllAccounts.push(customerAcc);
        console.log(chalk.bold.yellowBright(`\nThankyou ${chalk.bold.greenBright(customerAcc.Account_Title)} for choosing My OOP Bank for banking services.`));
        console.log(chalk.bold.yellowBright("\nYour account has been created with"),chalk.bold.greenBright(`Rs.${bal}/=`))
        console.log(chalk.bold.yellowBright("\nFor account details and balance click on 'Account Details Option'\n"));
    };

    DebitAmount(pin:number,Amount:number){
        let customerFound = this.find_customerusingPin(pin);
        if(customerFound){
            if (Amount<customerFound.Balance) {
                customerFound.Balance -= Amount;
                console.log(chalk.bold.greenBright(`\nTransaction Successful!!`));
                console.log(chalk.bold.yellowBright("Your Remaining account Balance is:"),chalk.bold.greenBright(`Rs.${customerFound.Balance}/=\n`));
                
            } else {
                console.log(chalk.bold.redBright("\nInsufficient Balance!!! The amount you have entered is more than the account balance itself.\n"));
            }
        }else{
            console.log(chalk.bold.redBright("\nIncorrect PIN CODE Try Again\n"));
        }
    };

    CreditAmount(pin:number,Amount:number){
        let customerFound = this.find_customerusingPin(pin);
        if (customerFound) {
            if(Amount>500){                                //If amount credited is more than Rs.500 then Rs.30 will be deducted
                customerFound.Balance += Amount;
                customerFound.Balance -= 30;
                console.log(chalk.bold.yellowBright(`\nDeposit Successful!!!\nRs.${30} have been deducted as charges on amount greater than Rs.500`));
                console.log(chalk.bold.yellowBright(`Your Remaining account Balance is:`),chalk.bold.greenBright(`Rs.${customerFound.Balance}/=\n`));
                
            }
            else{
                customerFound.Balance += Amount;
                console.log(chalk.bold.yellowBright("\nDeposit Successful!!!\nYour Remaining account Balance is:"),chalk.bold.greenBright(`Rs.${customerFound.Balance}/=\n`));      
            }
        } else {
            console.log(chalk.bold.redBright("Incorrect PIN CODE Try Again"));
        }
    };

    Accountdetails(password:string){                          
        let customerFound = this.AllAccounts.find((val)=>{return password===val.CNIC.substring(val.CNIC.length-4,val.CNIC.length)});;
        if(customerFound){
            console.log(chalk.bold.yellowBright("\n\tAccount Title: ")+chalk.bold.greenBright(`${customerFound.Account_Title}`));
            console.log(chalk.bold.yellowBright("\tIBAN: ")+chalk.bold.greenBright(`${customerFound.IBAN}`));
            console.log(chalk.bold.yellowBright("\tAccount Balance: ")+chalk.bold.greenBright(`Rs.${customerFound.Balance}/=`));
            console.log(chalk.bold.yellowBright("\tATM Pin: ")+chalk.bold.greenBright(`${customerFound.Pin_Code}`,"\n"));
        }
        else{
            console.log(chalk.bold.redBright("\nCustomer NOT found!! Try entering the password again.\n"));
        };
    };

    find_customerusingPin(pin:number){
        return this.AllAccounts.find((val)=>{return pin===val.Pin_Code});
    };

};

let bankAccounts = new myBank();

//Main function to run the entire program
async function Main() {
    console.log(chalk.bold.hex("D470A2")("\n\t<<<<<<(---------------------------------------------------------------)>>>>>>"));
    console.log(chalk.bold.hex("D470A2")("\t\t\t\tWelcome To My OOP Bank"));
    console.log(chalk.bold.hex("D470A2")("\t<<<<<<(---------------------------------------------------------------)>>>>>>\n"));

    while (true) {
        let user = await inquirer.prompt(
            {
                name : "choice",
                type : "list",
                message : chalk.bold.blueBright("Start by Creating an account :"),
                choices : [
                    "Create an Account",
                    "Debit Amount(Withdraw)",
                    "Credit Amount(Deposit)",
                    "View Account Details",
                    chalk.bold.redBright("Exit Bank")
                ]
            }
        );

        if (user.choice==="Create an Account"){
            let User = await inquirer.prompt([
                {
                    type : "input",
                    name : "first",
                    message : chalk.bold.hex("D470A2")("Enter your first name: ")
                },
                {
                    type : "input",
                    name : "last",
                    message : chalk.bold.hex("D470A2")("Enter your last name: ")
                },                
                {
                    type : "number",
                    name : "age",
                    message : chalk.bold.hex("D470A2")("Enter your age: ")
                },
                {
                    type : "input",
                    name : "gender",
                    message : chalk.bold.hex("D470A2")("Enter your gender: ")
                },
                {
                    type : "number",
                    name : "mobile",
                    message : chalk.bold.hex("D470A2")("Enter mobile No.: ")
                },
                {
                    type : "input",
                    name : "cnic",
                    message : chalk.bold.hex("D470A2")("Enter your CNIC no.: ")
                },
                {
                    type : "number",
                    name : "bal",
                    message : chalk.bold.hex("D470A2")("Deposit amount to open your account: ")
                },
                {
                    type : "number",
                    name : "pin",
                    message : chalk.bold.hex("D470A2")("Set your pin code of 4-5 digits: ")
                }
        ]);
            bankAccounts.CreateAccount(User.first,User.last,User.age,User.gender,User.mobile,User.cnic,User.bal,User.pin);
        }
        else if(user.choice==="Debit Amount(Withdraw)"){
            let User = await inquirer.prompt([
                {
                    name : "pin",
                    type : "number",
                    message : chalk.bold.hex("D470A2")("Enter your PIN to proceed with the transaction: ")
                },
                {
                    name : "amount",
                    type : "number",
                    message : chalk.bold.hex("D470A2")("Enter the amount you want to withdraw: ")
                }
            ]);
            bankAccounts.DebitAmount(User.pin,User.amount);
        }
        else if(user.choice==="Credit Amount(Deposit)"){
            let User = await inquirer.prompt([
                {
                    name : "pin",
                    type : "number",
                    message : chalk.bold.hex("D470A2")("Enter your PIN to proceed with the transaction: ")
                },
                {
                    name : "amount",
                    type : "number",
                    message : chalk.bold.hex("D470A2")("Enter the amount you want to deposit: ")
                }
            ]);
            bankAccounts.CreditAmount(User.pin,User.amount);
        }
        else if(user.choice==="View Account Details"){ //Account details are protected by password(last 4 digits of CNIC)
            let User = await inquirer.prompt(
                {
                    name : "password",
                    type : "input",
                    message : chalk.bold.hex("D470A2")("Account details are protected so please enter the last 4 digits of your CNIC No. : ")
                }
            );
            bankAccounts.Accountdetails(User.password);
        }
        else{
            console.log(chalk.bold.redBright("\n\t\tExiting.................."));
            process.exit();
        }
    };
};

//Invoking the Main function
Main();
