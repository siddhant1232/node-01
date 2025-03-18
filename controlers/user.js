const User = require('../models/user')

async function handleCreateUser (req, res){
    const body = req.body;
    if(
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
      ){
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
}

async function handleGetAllUsers(req,res){
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUsersById(req,res){
    const user = await User.findById(req.params.id)
    if(!user){
      return res.status(404).json({error:'user not found'})
    }
    return res.json(user);
}

async function handleUpdateUsersById(req,res){
    await User.findByIdAndUpdate(req.params.id,{last_name:"changedbyme"})
    return res.json({msg: "successully changed"})
}

async function handleDeleteUsersById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({msg :"succesfully deleted"})
}

module.exports = {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUsersById,
  handleUpdateUsersById,
  handleDeleteUsersById,
};