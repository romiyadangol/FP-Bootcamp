import { loadNavbar } from './loadNavbar.js';
import { request } from './request.js';

document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    const postContainer = document.getElementById('posts');
    const url = 'https://jsonplaceholder.typicode.com/posts';

        request('GET', url)
        .then(posts => {
            posts.slice(0, 9).map(post => {
                const postElement = createPostElement(post);
                postContainer.appendChild(postElement);
            });
        });

        const addPostBtn = document.getElementById('add-post');
        addPostBtn.addEventListener('click', function(){
            const title = prompt('Enter title')
            const body = prompt('Enter description');
            const data = { title, body, userId :1 };
            console.log(data);
            request('POST', url, data)
            .then(post => {
                const postElement = createPostElement(post);
                postContainer.prepend(postElement);
            });
        });

    });

    function createPostElement(post){
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.setAttribute('id', post.userId);
        const randomImage = `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${randomImage}" alt="Post Image" class="post-image">
                <h2>${post.blogTitle}</h2>
            </div>
            <p>${post.blogDescription}</p>

            <div class="posts-btn">
                <label class="container">
                    <input type="checkbox">
                    <svg id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M29.845,17.099l-2.489,8.725C26.989,27.105,25.804,28,24.473,28H11c-0.553,0-1-0.448-1-1V13  c0-0.215,0.069-0.425,0.198-0.597l5.392-7.24C16.188,4.414,17.05,4,17.974,4C19.643,4,21,5.357,21,7.026V12h5.002  c1.265,0,2.427,0.579,3.188,1.589C29.954,14.601,30.192,15.88,29.845,17.099z" id="XMLID_254_"></path><path d="M7,12H3c-0.553,0-1,0.448-1,1v14c0,0.552,0.447,1,1,1h4c0.553,0,1-0.448,1-1V13C8,12.448,7.553,12,7,12z   M5,25.5c-0.828,0-1.5-0.672-1.5-1.5c0-0.828,0.672-1.5,1.5-1.5c0.828,0,1.5,0.672,1.5,1.5C6.5,24.828,5.828,25.5,5,25.5z" id="XMLID_256_"></path></svg>
                </label>
                <button class="comment-btn">💬Comment</button>
                <button id="delete-btn" class="delete-btn">❌</button>
            </div>
        `;
        postElement.querySelector('.comment-btn').addEventListener('click', function() {
            fetch(`https://jsonplaceholder.typicode.com/posts/${post.userId}`)
                .then(response => response.json())
                .then(postDetail => {
                fetch(`https://jsonplaceholder.typicode.com/posts/${post.userId}/comments`)
                    .then(response => response.json())
                    .then(comments => {
                        console.log(postDetail);
                        showDetails(postDetail, comments);
                    });
            });
        });

        postElement.querySelector('.delete-btn').addEventListener('click', function() {
            request('DELETE', `https://jsonplaceholder.typicode.com/posts/${post.userId}`)
            .then(() => {
                postElement.remove();
            });
        });

        return postElement;
    }



function showDetails(postDetail, comments) {
    const postDetailsContainer = document.createElement('div');
    postDetailsContainer.classList.add('post-detail');
    postDetailsContainer.innerHTML = `
        <div class="postDetailsContainer-content">
            <span class="close">&times;</span>
            <div class="post-body">
                <div class="post-header">
                    <img src="https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}" alt="Post Image" class="post-image">
                    <h2>${postDetail.title}</h2>
                </div>
                <p>${postDetail.body}</p>
            </div>
            <h3>Comments:</h3>
            ${comments.map(comment => `
                <div class="comment">
                    <div class="post-header">
                        <img src="https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}" alt="Post Image" class="post-image">
                        <h4>${comment.name}</h4>
                    </div>
                    <p>${comment.body}</p>
                    <small>${comment.email}</small>
                </div>
            `).join('')}
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