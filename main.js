document.addEventListener('DOMContentLoaded', () => {
    updateBackground(false); // Load initial background image
    fetchData('');
});

document.getElementById('search-box').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const searchText = document.getElementById('search-box').value;
        updateBackground(searchText);
        fetchData(searchText);
    }
});

function updateBackground(searchText) {
    const body = document.body;
    const footer = document.getElementById('footer'); 

    if (searchText) {
        body.style.transition = 'background 0.5s ease-in-out';
        body.style.background = '#282c35';
        footer.style.display = 'none'; 
    } else {
        body.style.transition = 'background 0.5s ease-in-out';
        body.style.background = 'url(./image/store_home_share.jpg) center/cover no-repeat';
        footer.style.display = 'block'; 
    }
}

function fetchData(searchText) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open('GET', `https://steam2.p.rapidapi.com/search/${searchText}/page/1`);
    xhr.setRequestHeader('X-RapidAPI-Key', '46cc8d149dmsh4197243940eabddp1c5376jsnbfc0db6ce67b');
    xhr.setRequestHeader('X-RapidAPI-Host', 'steam2.p.rapidapi.com');

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const res = xhr.responseText;
            const result = JSON.parse(res);
            displayGames(result);
        }
    };

    xhr.send();
}

function displayGames(result) {
    const gamesContainer = document.getElementById('games');
    let output = '';

    if (result.length === 0) {
        output = '<p>No results found.</p>';
    } else {
        for (let i = 0; i < result.length; i++) {
            output += `
            <div class="my-div-js">
                <a href="${result[i].url}" target="_blank">
                    <img src="${result[i].imgUrl}" class="image">
                    <h2 class="my_h2">${result[i].title}</h2>
                </a>
            </div>`;
        }
    }

    gamesContainer.innerHTML = output;
}
