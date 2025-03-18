const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 8000;
const fs = require('fs');
const mongoose = require('mongoose');
const { error } = require('console');

// connection
mongoose
  .connect("mongodb://127.0.0.1:27017/first-node-app")
  .then (()=> console.log("mongodb connected"))
  .catch ((err)=> console.log("mongo error",err));

// schema
const userSchema = new mongoose.Schema({
  first_name:{
    type: String,
    required : true,
  },
  last_name:{
    type:String,
  },
  email:{
    type:String,
    required: true,
    unique:true,
  },
  job_title:{
    type:String,
  },
  gender:{
    type:String,
  },
  
},
  {timestamps:true}
);
const User = mongoose.model("user", userSchema);


// middleware -plugin
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 

app.use((req,res,next)=>{
  console.log('heello middleware')
  next();
})

app.use((req,res,next)=>{
  console.log('heello middleware 2')
  next();
})

app.listen(8000, () => {
  console.log(`server is running at ${port}`);
});

app.get('/users', async (req, res) => {
  const allDbUsers = await User.find({})
  const html = `
    <ul>
    ${allDbUsers
      .map((User) => `<li>${User.first_name} - ${User.email}</li>`)
      .join('')}
    </ul>
  `;
  res.send(html);
});

app
  .route('/api/users/:id')
  .get(async(req, res) => {
    // const id = Number(req.params.id);
    const user = await User.findById(req.params.id)
    if(!user){
      return res.status(404).json({error:'user not found'})
    }
    return res.json(user);
  })
  .patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id,{last_name:"changedbyme"})
    return res.json({msg: "successully changed"})
  })
  .delete(async(req,res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({msg :"succesfully deleted"})
  })

app
  .route('/api/users')
  .post(async(req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
      res.status(401).json({msg: 'all details required'})
    }

    const result = await User.create({
      first_name:body.first_name,
      last_name:body.last_name,
      email:body.email,
      gender:body.gender,
      job_title:body.job_title,
    })
    console.log("result",result)
    return res.status(201).json({msg:"user created"})

    // users.push({ ...body, id: users.length + 1 });
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    //   if (err) {
    //     return res.status(500).json({ error: "Failed to save user data" });
    //   }
    //   return res.status(201).json({ status: "success", id: users.length });
    // });
  })
  .get((req, res) => {
    return res.json(users);
  });

