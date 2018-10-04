export class Client {
    private _id: string;
    private _name: string;
    private _email: string;
    private _streetname: string;
    private _streetnumber: string;
    private _phone: string;
    private _gender: string;
    private _birth:string;
    private _username:string;


constructor(name: string, email: string, streetname: string, streetnumber: string, phone: string, gender:string, birth:string, username:string) {
  this._name = name;
  this._email = email;
  this._streetname = streetname;
  this._streetnumber = streetnumber;
  this._phone = phone;
  this._gender = gender;
  this._birth = birth;
  this._username = username;

}

    get id(): string {
        return this._id;
    }
    get email(): string {
        return this._email;
    }
    get name(): string {
        return this._name;
    }
    get streetname(): string{
        return this._streetname;
    }

    get streetnumber(): string{
        return this._streetnumber;
    }
    get phone(): string{
        return this._phone;
    }
    get gender(): string{
        return this._gender;
    }
    get birth(): string{
        return this._birth;
    }
    get username(): string{
        return this._username;
    }


    static fromJSON(json: any): Client {
        const clientob = new Client(
            json.name,
            json.email,
            json.streetname,
            json.streetnumber,
            json.phone,
            json.gender,
            json.birth,
            json.username
        );
        clientob._id = json._id;
        return clientob;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            email: this._email,
            streetname: this._streetname,
            streetnumber: this._streetnumber,
            phone: this._phone,
            gender: this._gender,
            birth: this._birth,
            username: this._username
        };
    }
}