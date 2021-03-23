const User = require('../models/user');
const UserCtrl = {};
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs"); 
const validator = require("email-validator");
const { token } = require('morgan');
const SECRET = process.env.SECRET;

UserCtrl.getUsers = async (req,res)=>
{
    const constulta = await User.find();
    res.json(constulta);
}

UserCtrl.getFilterUser = async (req,res) =>
{
    const {name,hobby} = req.params;
    const users = await User.find({$or:[{name:name }, {hobby:hobby}]});
    res.json(users);
                          
}

UserCtrl.getSpecificList = async (req,res) =>
{
    const users = await User.aggregate(
           [{
               $match:{$and:[{age:{"$gte":18}},
               { gender:"Female"},
               {$and:[{date:{"$lte":new Date()}},{date:{"$gte":new Date(new Date()-3*24*60*60000)}}]}]}},
               {$project:{"name":1, "phone":1, "hobby":1}},
               {$group:{_id:"$hobby"}}
        ])
        .then(user => res.status(200).json(user))
        .catch(err => res.status(403).json(err));
    
    res.json(users);
                          
}

UserCtrl.createUser= async (req,res)=>
{
    const regex = /^[0-9]*$/;

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        age: req.body.age,
        gender: req.body.gender,
        hobby: req.body.hobby
    };
    const errors = [];
    const emailUse = await User.findOne({email:newUser.email});
    if(!newUser.name)
        errors.push({text:'Plase write Name'});
    else if(!newUser.email)
        errors.push({text:'Please write Email'});
    else if(emailUse)
        errors.push({text:'The email is already in use'});
    else if(!validator.validate(newUser.email))
        errors.push({text:'Wrong email'});
    else if(!newUser.password)
        errors.push({text:'Plase write Password'});
    else if(!newUser.phone)
        errors.push({text:'Plase write Phone'});
    else if(newUser.phone.length!=10)
        errors.push({text: 'Please enter 10 numbers'});
    else if(!regex.test(newUser.phone))
         errors.push({text: 'Just numbers on the phone.'});
    else if(!newUser.age)
        errors.push({text:'Please write an Age'});
    else if(!newUser.gender)
        errors.push({text:'Please write an Gender'});
    else if(!newUser.hobby)
        errors.push({text:'Please write an Hobby'});

    if(errors.length>0)
    {
        res.status(403).json(
            {
                'errors':errors,
                'token': ''
            }
        );
    }else{
        const users = new User(newUser);
        bcrypt.genSalt(10,  (err, salt) => {
            bcrypt.hash(users.password, salt, async (err, hash) => {
               if (err) throw err;
               users.password = hash;
               await users.save()
                  .then(user => res.json(user))
                  .catch(err =>
                     console.log({ error: "Error creating a new user" })
                  );
            });
         });
        const token = await jwt.sign({_id:users._id},'secretkey');
        res.status(200).json({
            'errors':'',
            'token':token
        });
    }

    
}

UserCtrl.deleteUser= async (req,res) =>
{
    const { id } = req.params;
    await User.findByIdAndRemove(id);
    res.json(
        {
            'status': 'User deleted'
        }
    );
};

UserCtrl.getSingIn= async (req,res)=>
{
    const {email,password} = req.body;
    const errors=[];
    if(!email)
        errors.push({text:'Please write Email'});
    else if(!password)
        errors.push({text:'Please write Password'});

    if(errors.length>0)
    {
        res.status(403).json(
            {
                'errors':errors,
                'token': ''
            }
        )
    }else{
    const users = await User.findOne({email});
    if(!users) 
    {
        errors.push({text:'Wrong Password'});
        return res.status(403).json(
            {
                'errors': errors,
                'token': ''
            }
        )
    }
    bcrypt.compare(password,users.password).then(isMatch =>
        {
            if(isMatch)
            {
              const token =   jwt.sign({_id: users._id},'secretkey');
              return res.status(200).json({
                  'errors': '',
                  'token':token});
            }else
            {
              errors.push({text:'Password Incorrect'});
              return res.status(403).json({ 
                'errors':errors,
                'token':''  });
            }
        });

    }
}

UserCtrl.verifyToken = async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = UserCtrl;