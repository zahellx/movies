const allRoles = {
  user: ['getUsers', 'getMovies', 'manageMovies'],
  admin: ['admin', 'getUsers', 'manageUsers', 'getMovies', 'manageMovies'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
