fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
    });

document.addEventListener('DOMContentLoaded', function() {
    const postContainer = document.getElementById('posts');

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            posts.slice(0, 9).forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.setAttribute('id', post.id);
                const randomImage = `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;
                postElement.innerHTML = `
                    <div class="post-header">
                        <img src="${randomImage}" alt="Post Image" class="post-image">
                        <h2>${post.title}</h2>
                    </div>
                    <p>${post.body}</p>
                `;

                postElement.addEventListener('click', function() {
                    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
                        .then(response => response.json())
                        .then(postDetail => {
                            console.log(postDetail);
                            showDetails(postDetail);
                        });
                });

                postContainer.appendChild(postElement);
            });
        });
});

function showDetails(postDetail) {
    const postDetailsContainer = document.createElement('div');
    postDetailsContainer.classList.add('post-detail');
    postDetailsContainer.innerHTML = `
        <div class="postDetailsContainer-content">
            <span class="close">&times;</span>
                        <img src="https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}" alt="Post Image" class="post-image">
                         <h2>${postDetail.title}</h2>
            <p>${postDetail.body}</p>
        </div>
    `;
    document.body.appendChild(postDetailsContainer);

    postDetailsContainer.querySelector('.close').addEventListener('click', function() {
        document.body.removeChild(postDetailsContainer);
    });

    postDetailsContainer.addEventListener('click', function(event) {
        if (event.target === postDetailsContainer) {
            document.body.removeChild(postDetailsContainer);
        }
    });
}
