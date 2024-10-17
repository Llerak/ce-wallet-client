export interface IRoleDto {
  id: string;
  role: string;
}

export enum RoleType {
  Assessor = 'Asesor',
  Supervisor = 'Supervisor',
  Administrator = 'Administrador',
}
