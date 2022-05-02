import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles = new Map([
    ["ROLE_SYSADMIN", "Системный администратор"],
    ["ROLE_DISPATCHER", "Диспетчер"],
    ["ROLE_GARAGEMANAGER", "Начальник гаража"],
    ["ROLE_DRIVER", "Водитель"]
  ])

  constructor() { }

  getLocalRoleName(role: string): string {
    let ans = this.roles.get(role);
    
    return ans != undefined ? ans : "";
  }

  getRoleName(role: string): string {
    let ans = "";
    this.roles.forEach( (key, value) => {
      if (value === role) {
        ans = key;
      }
    });
    
    return ans;
  }
}
