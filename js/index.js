document.addEventListener("DOMContentLoaded", () => {
    const githubForm = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    githubForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== "") {
        const userData = await searchUsers(searchTerm);
        displayUsers(userData.items);
      }
    });
  
    userList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("user-link")) {
        const username = event.target.dataset.username;
        const reposData = await getUserRepos(username);
        displayRepos(reposData);
      }
    });
  
    async function searchUsers(searchTerm) {
      const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to search users.");
      }
    }
  
    async function getUserRepos(username) {
      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to get user repos.");
      }
    }
  
    function displayUsers(users) {
      userList.innerHTML = "";
      reposList.innerHTML = "";
      users.forEach(user => {
        const userElement = document.createElement("li");
        userElement.innerHTML = `
          <a href="${user.html_url}" target="_blank" class="user-link" data-username="${user.login}">${user.login}</a>
        `;
        userList.appendChild(userElement);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = "";
      repos.forEach(repo => {
        const repoElement = document.createElement("li");
        repoElement.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        `;
        reposList.appendChild(repoElement);
      });
    }
  });