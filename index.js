document.getElementById('github-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const reposList = document.getElementById('repos-list');
    const errorMessage = document.getElementById('error-message');
    
    // Clear previous results and errors
    reposList.innerHTML = '';
    errorMessage.style.display = 'none';

    // Make API request
    fetch('https://api.github.com/users/' + username + '/repos')
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found or API rate limit exceeded');
            }
            return response.json();
        })
        .then(repos => {
            repos.forEach(repo => {
                const li = document.createElement('li');
                li.className = 'repo-item';
                
                const link = document.createElement('a');
                link.href = repo.html_url;
                link.target = '_blank';
                link.textContent = repo.name;
                
                li.appendChild(link);
                reposList.appendChild(li);
            });
        })
        .catch(error => {
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        });
});