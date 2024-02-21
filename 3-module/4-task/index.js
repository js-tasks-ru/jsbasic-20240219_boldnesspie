function showSalary(users, age) {
  let usersBalance = '';

  users
    .filter(user => user.age <= age)
    .forEach((user, index, filteredUsers) => {
      
      usersBalance += `${user.name}, ${user.balance}`;
      if (index != filteredUsers.length - 1) usersBalance += '\n';
    })

  return usersBalance;
}
