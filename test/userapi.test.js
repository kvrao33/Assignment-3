import request from "supertest";
import app from "./app.js"

describe("POST /user", () => {
    describe("Testing a register user data", () => {

        test("should respond with a 200 status code", async () => {
          const response = await request(app).post("/user").send({
           name:"rao",
           phone:1234567890,
           uid:256
          })
          expect(response.statusCode).toBe(200)
        })
        test("should specify json in the content type header", async () => {
            let data=[{name:"rao",
            phone:1234567890,},{uid:786,
            phone:1234567890,},{name:"rao",
            uid:785}]
            data.forEach(async(element) => {
                const response = await request(app).post("/users").send(element)   
                expect(response.statusCode).toBe(400)   
            });
          
        })
        // test("response has userId", async () => {
        //   const response = await request(app).post("/users").send({
        //     username: "username",
        //     password: "password"
        //   })
        //   expect(response.body.userId).toBeDefined()
        // })
      })


    })