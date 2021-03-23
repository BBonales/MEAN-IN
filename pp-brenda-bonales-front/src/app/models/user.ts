export class User {
    constructor(_id='',name='',email='',phone=0,password='',age=0,gender='',hobby='')
{
    
    this._id=_id;
    this.name=name;
    this.email=email;
    this.phone=phone;
    this.password=password;
    this.age=age;
    this.gender=gender;
    this.hobby=hobby;
    this.date= new Date;
}

        _id: string;
        name: string;
        email:  String;
        phone:  Number;
        password:  String;
        age: Number;
        gender:  String;
        hobby:  String;
        date:Date;
}
