export const isUserExist = (users, email) => {
  return users.find((user) => user.email === email);
};

export const findUsers = (users, query) => {
  if (query.trim() === "") return [];
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.phone.toLowerCase().includes(query.toLowerCase())
  );
};

export const paginatedData = (data, usersPerPage, activePage) => {
  return data.slice((activePage - 1) * usersPerPage, activePage * usersPerPage);
};

export const sortedBy = (data, field) => {
  return data.sort((a, b) => (a[field] > b[field] ? 1 : -1));
};
