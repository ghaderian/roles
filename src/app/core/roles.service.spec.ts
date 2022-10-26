import { TestBed } from '@angular/core/testing';

import { Role, roles, RolesService, users } from './roles.service';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('all roles should be under roleId 1 (sys admin)', () => {

    let subRoles = Role.getAllChildRoles(1,roles);

    expect(subRoles.length === 4).toBeTruthy();
  });


  it('3 roles should be under roleId 2 (location manager)', () => {

    let subRoles = Role.getAllChildRoles(2,roles);

    expect(subRoles.length === 3).toBeTruthy();
    expect(subRoles.find(sr => sr.Id === 3)).toBeTruthy();
    expect(subRoles.find(sr => sr.Id === 4)).toBeTruthy();
    expect(subRoles.find(sr => sr.Id === 5)).toBeTruthy();

  });

  it('2 roles should be under roleId 3 (supervisor)', () => {

    let subRoles = Role.getAllChildRoles(3,roles);

    expect(subRoles.length === 2).toBeTruthy();
    expect(subRoles.find(sr => sr.Id === 4)).toBeTruthy();
    expect(subRoles.find(sr => sr.Id === 5)).toBeTruthy();

  });

  it('should return the right subordinartes', () => {

    service.Roles = roles;
    service.Users = users;

    let subordinates = service.getSubOrdinates(3)

    expect(subordinates.length === 2).toBeTruthy();
    expect(subordinates.find(s =>s.Id === 2)).toBeTruthy();
    expect(subordinates.find(s =>s.Id === 5)).toBeTruthy();

  });

  it('should return the right subordinartes (second example)', () => {

    service.Roles = roles;
    service.Users = users;

    let subordinates = service.getSubOrdinates(1)

    expect(subordinates.length === 4).toBeTruthy();
    expect(subordinates.find(s =>s.Id === 2)).toBeTruthy();
    expect(subordinates.find(s =>s.Id === 3)).toBeTruthy();
    expect(subordinates.find(s =>s.Id === 4)).toBeTruthy();
    expect(subordinates.find(s =>s.Id === 5)).toBeTruthy();

  });

});
