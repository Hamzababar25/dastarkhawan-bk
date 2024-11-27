import { User, UserRole } from "src/modules/user/entites/user.entity";


export const RegionLocations = {
  north: ['Alpha', 'Vanguard', 'North', 'Vantage'],
  central: ['Boulevard', 'Downtown', 'Fairways', 'One Vogue','Vite'],
};
export const LineManagerRoles = {
  [UserRole.COMMUNITY_ASSOCIATE]: UserRole.COMMUNITY_EXECUTIVE,
  [UserRole.FRONT_DESK_OFFICER]: UserRole.COMMUNITY_ASSOCIATE,
[UserRole.FACILITY_MANAGER]: UserRole.FRONT_DESK_OFFICER,
[UserRole.ADMIN_MANAGER]: UserRole.FRONT_DESK_OFFICER,
[UserRole.IT_TEAM]: UserRole.FRONT_DESK_OFFICER,
[UserRole.IT_HEAD]: UserRole.FRONT_DESK_OFFICER,
[UserRole.BUILDOUT]: UserRole.FRONT_DESK_OFFICER,
[UserRole.FINANCE_TEAM]: UserRole.FRONT_DESK_OFFICER,
[UserRole.SALES_TEAM]: UserRole.FRONT_DESK_OFFICER,
[UserRole.HEAD_OF_SALES]: UserRole.FRONT_DESK_OFFICER,
[UserRole.HEAD_OF_MARKETING]: UserRole.FRONT_DESK_OFFICER,
[UserRole.MARKETING_TEAM]: UserRole.FRONT_DESK_OFFICER,
[UserRole.PEOPLE_CULTURE_HEAD]: UserRole.FRONT_DESK_OFFICER,
[UserRole.YELLOW_BAR]: UserRole.FRONT_DESK_OFFICER,

[UserRole.SUPERVISOR]: UserRole.FRONT_DESK_OFFICER,













  // Add additional mappings as required
};
// export const getDelegate=async(role: UserRole, location: string): Promise<User | null>=> {
//   let delegateRole: UserRole;

//   // Determine delegate role based on current role
//   switch (role) {
//     case UserRole.CEO:
//     case UserRole.COO:
//     case UserRole.REGIONAL_MANAGER:
//       delegateRole = UserRole.COMMUNITY_EXECUTIVE;
//       break;
//     case UserRole.COMMUNITY_EXECUTIVE:
//       delegateRole = UserRole.COMMUNITY_ASSOCIATE;
//       break;
//     case UserRole.COMMUNITY_ASSOCIATE:
//     case UserRole.FRONT_DESK_OFFICER:
//       delegateRole = UserRole.SUPERVISOR;
//       break;
//     default:
//       delegateRole = UserRole.SUPERVISOR;
//   }

//   // Find delegate user based on role and location
//   return this.userRepository.findOne({
//     where: {
//       role: delegateRole,
//       location,
//     },
//   });
// }
