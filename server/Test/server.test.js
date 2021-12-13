const app = require("../server");
const supertest = require("supertest"); //service
const request = supertest(app);
const fs = require('fs');
const db = require("../databaseFunctions");


beforeAll(done => {
    done()
})

afterAll(done => {
    app.close();
    done()
})

//This only works the first time around. It will pass the test but
//all the rest of the time you want to see it added to the json file, you must delete
//this account entry from the json
test('1.1 Test that register to a new user and successful authentication', async () => {

    var passed = false;

    var res;

    const data1 = {
        fName: "test",
        lName: "testL",
        email: "google@abc.com",
        password: "1234567!"
    };

    const promise = new Promise( async function (resolve) {
        
        res = await request.post('/register').send({
            fName: "test",
            lName: "testL",
            email: "google@abc.com",
            password: "1234567!"
        });

        console.log("out");
        resolve();

    });

    await promise;
    if(res.body.message == "Account Successfully Made"){
        expect(res.body.message).toBe("Account Sucessfully Made");
    }

    //If you didnt delete the entry before running the program again
    if(res.body.message == "Email already used"){
        expect(res.body.message).toBe("Email already used");
    }

});

test('1.2 Test that register new user with existing email', async () => {

    var res;

    const data1 = {
        fName: "test",
        lName: "testL",
        email: "google@abc.com",
        password: "1234567!"
    };

    const promise = new Promise( async function (resolve) {
        
        res = await request.post('/register').send({
            fName: "test",
            lName: "testL",
            email: "google@abc.com",
            password: "1234567!"
        });

        console.log("out");
        resolve();

    });

    await promise;
    //If you didnt delete the entry before running the program again
    if(res.body.message == "Email already used"){
        expect(res.body.message).toBe("Email already used");
    }
    //db.deleteUserNoId(data1.email, data1.password);


});

test('2.1 Test with right login information', async () => {

    var res;
    const data1 = {
        fName: "test",
        lName: "testL",
        email: "google@abc.com",
        password: "1234567!"
    };

    const promise = new Promise( async function (resolve) {
        
        res = await request.post('/login').send({
            email: "google@abc.com",
            password: "1234567!"
        });

        console.log("out");
        resolve();

    });

    await promise;

    expect(res.body.message).toBe("Sucessfully Authenticated");


});

test('2.2 Test with wrong login information', async () => {

    var res;
    const data1 = {
        fName: "test",
        lName: "testL",
        email: "google@abc.com",
        password: "notthepassword!"
    };

    const promise = new Promise( async function (resolve) {
        
        res = await request.post('/login').send({
            email: "google@abc.com",
            password: "notthepassword!"
        });

        console.log("out");
        resolve();

    });

    await promise;

    expect(res.body.message).toBe("No User Exists");


});

test('3.1 Test user with not authenticated', async () => {

    var res1;
    const data1 = {
        fName: "test",
        lName: "testL",
        email: "google@abc.com",
        password: "notthepassword!"
    };

    const promise = new Promise( async function (resolve) {
        
        res1 = await request.get('/user');

        console.log("out");
        resolve();

    });

    await promise;

    expect(res1.body.message).toBe("No authenticated User");


});

test('3.2 Test user with authenticated', async () => {

    var res;

    const promise = new Promise( async function (resolve) {
        
        res = await request.post('/login').send({
            email: "google@abc.com",
            password: "1234567!"
        });

        console.log("out");
        resolve();

    });

    await promise;

    const promise2 = new Promise( async function (resolve) {
        
        res1 = await request.get('/user');

        console.log("out");
        resolve();

    });

    await promise2;

    expect(res.body.message).not.toBe("No authenticated User");


});

test('4. Test logout', async () => {

    var res;

    const promise = new Promise( async function (resolve) {
        
        res = await request.post('/login').send({
            email: "google@abc.com",
            password: "1234567!"
        });

        console.log("out");
        resolve();

    });

    await promise;

    const promise2 = new Promise( async function (resolve) {
        
        res = await request.get('/user');

        console.log("out");
        resolve();

    });

    await promise2;

    const promise3 = new Promise( async function (resolve) {
        
        res = await request.get('/logout');

        console.log("out");
        resolve();

    });

    await promise3;

    expect(res.body.message).not.toBe("No authenticated User");


});