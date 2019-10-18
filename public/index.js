// register service worker
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
        .then( reg => console.log('Service worker has been registered successful') )
  })
}

// a button to install
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  deferredPrompt = event;
});

const btnAdd = document.getElementById('btnAdd');

btnAdd.addEventListener('click', () => deferredPrompt.prompt());

// rendering stuff
function getNews () {
  const apiKey ="<YOUR_API_KEY_HERE>";

  fetch(`https://newsapi.org/v2/everything?q=bitcoin&from=2019-09-17&sortBy=publishedAt&apiKey=${apiKey}`)
      .then( response => response.json() )
      .then( result => renderNews({news: result.articles}) )
}

function renderCard ({title, imgLink, date}) {
  return `
    <div class="card">
        <img src=${imgLink} alt="" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text"><small class="text-muted">${date}</small></p>
        </div>
    </div>
  `
}

function renderNews({news}) {
  const cols = document.getElementById('cardContainer');

  news.map( article => cols.innerHTML += renderCard({
    title: article.title,
    imgLink: article.urlToImage,
    date: article.publishDate
  }) )
}

getNews();