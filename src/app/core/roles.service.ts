import { Injectable } from '@angular/core';


export const roles: Array<Role> = [
  {
    Id: 1,
    Name: "System Administrator",
    Parent: 0
  },
  {
    Id: 2,
    Name: "Location Manager",
    Parent: 1,
  },
  {
    Id: 3,
    Name: "Supervisor",
    Parent: 2,
  },
  {
    Id: 4,
    Name: "Employee",
    Parent: 3,
  },
  {
    Id: 5,
    Name: "Trainer",
    Parent: 3,
  }
]


export const users: Array<User> = [
  {
    Id: 1,
    Name: "Adam Admin",
    Role: 1
  },
  {
    Id: 2,
    Name: "Emily Employee",
    Role: 4
  },
  {
    Id: 3,
    Name: "Sam Supervisor",
    Role: 3
  },
  {
    Id: 4,
    Name: "Mary Manager",
    Role: 2
  },
  {

    Id: 5,
    Name: "Steve Trainer",
    Role: 5
  }
]

export class Role {
  Id: number;
  Name: string;
  Parent: number;

  constructor(id:number, name: string, parent: number) {
    this.Id = id;
    this.Name = name;
    this.Parent = parent;
  }


  static getDirectChildRoles(roleId: number, roles: Array<Role>): Array<Role> {
    return roles.filter(r => r.Parent === roleId);
  }

  static getAllChildRoles(roleId: number, roles: Array<Role>): Array<Role> {
    let result: Array<Role> = [];

    result = Role.getDirectChildRoles(roleId, roles); 

    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      let childs = Role.getDirectChildRoles(element.Id, roles);

      childs.forEach(element => {
        
        if( !result.find(r => r.Id === element.Id)) {
          result.push(element);
        }
      });
      
    }

    return result
  }

}

export class User {
  Id: number;
  Name: string;
  Role: number;

  constructor(id:number, name: string, role: number) {
    this.Id = id;
    this.Name = name;
    this.Role = role;
  }
}


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor() { }

  public Roles: Array<Role> = [];
  public Users: Array<User> = [];


  public getSubOrdinates(userId: number): Array<User> {
    let result: Array<User> = [];

    let user = this.Users.find(user => user.Id === userId);
    if (user) {

      let subRoles = Role.getAllChildRoles(user.Role, this.Roles);

      subRoles.forEach(role => {

        let roleUsers = this.Users.filter(user => user.Role === role.Id) 
        
        roleUsers.forEach(user => {
          result.push(user);
        });
      });
    }
    
    return result
  }
}
