const request = require('supertest')
const app = require('../app')


describe('User Post', () => {
  it('With proper and exist data', async () => {
    const res = await request(app).post('/user').send({
        uid: 456,
        name:"rao",
        phone:9342607939
      })
    expect(res.statusCode).toEqual(400)
  })

  it('With missing values and validation error values', async () => {
    let data=[
      {uid: 456,name:"rao"},
    {uid: 456,phone:9342607939},
    {name:"rao",phone:9342607939},
    {name:"",phone:9342607939,uid:123},
    {name:"rao",phone:934260793,uid:123},
    {name:"",phone:9342607939,uid:"123"},
  {}]

  data.forEach(async element=>{
    let res = await request(app).post('/user').send(element)
  expect(res.statusCode).toEqual(422)
  })

  })
});

describe('user PUT request',()=>{
  it('Non exits User ID', async () => {
    const res = await request(app).post('/user').send({
        uid: 899,
        name:"rao",
        phone:9342607939
      })
    expect(res.statusCode).toEqual(400)
  })
  it('With invalid Data',async()=>{

    let data=[
    {uid: 456,phone:934260793},
    {name:"rao",phone:9342607939},
    {name:"",phone:9342607939,uid:123},
    {name:"",phone:9342607939,uid:"123"},
  {}]

  data.forEach(async element=>{
    let res = await request(app).put('/user').send(element)
  expect(res.statusCode).toEqual(422)
  })
  let res = await request(app).put('/user').send({name:"rao",uid:800})
  expect(res.statusCode).toEqual(400)
  expect(JSON.parse(res.text)).toEqual({message:"User Id does not exist"})

  })
  it('With valid Data', async () => {
    const res = await request(app).put('/user').send({
        uid: 127,
        name:"rao",
        phone:9342607939
      })
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text).data.phone).toEqual(9342607939)

  })

  });

