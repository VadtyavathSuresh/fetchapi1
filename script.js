const userContainer = document.getElementById('user-container');
const reloadBtn = document.getElementById('reloadBtn');
const searchInput = document.getElementById('searchInput');
const addUserBtn = document.getElementById('addUserBtn');

let allUsers = [];

function fetchUsers() {
  userContainer.innerHTML = 'Loading users...';
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) throw new Error('API request failed');
      return response.json();
    })
    .then(users => {
      allUsers = users;
      displayUsers(allUsers);
    })
    .catch(error => {
      userContainer.innerHTML = `<p style="color: red;">Failed to load users: ${error.message}</p>`;
    });
}

function displayUsers(users) {
  userContainer.innerHTML = '';
  if (users.length === 0) {
    userContainer.innerHTML = '<p>No users found.</p>';
    return;
  }

  users.forEach(user => {
    const card = document.createElement('div');
    card.classList.add('user-card');
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address}</p>
    `;
    userContainer.appendChild(card);
  });
}

// Filter users by name
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allUsers.filter(user => user.name.toLowerCase().includes(query));
  displayUsers(filtered);
});

// Reload original users
reloadBtn.addEventListener('click', () => {
  searchInput.value = '';
  fetchUsers();
});

// Add new user to list
addUserBtn.addEventListener('click', () => {
  const name = document.getElementById('customName').value.trim();
  const email = document.getElementById('customEmail').value.trim();
  const address = document.getElementById('customAddress').value.trim();

  if (!name || !email || !address) {
    alert('Please fill in all fields.');
    return;
  }

  const newUser = {
    name,
    email,
    address
  };

  allUsers.push(newUser); // add to main array
  displayUsers(allUsers); // update UI

  // Optional: clear inputs
  document.getElementById('customName').value = '';
  document.getElementById('customEmail').value = '';
  document.getElementById('customAddress').value = '';
});

// Initial load
fetchUsers();
