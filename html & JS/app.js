const form = document.querySelector('#search-form'),
      searchField = document.querySelector('#search-keyword'),
      unsplashRequest = new XMLHttpRequest,
      responseContainer = document.getElementById('response-container'),
      nyTimes = new XMLHttpRequest;

form.addEventListener('submit', function(e){
        e.preventDefault();
        searchedForText = searchField.value;

        responseContainer.innerHTML = '';
        unsplashRequest.open('GET',`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}` )
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 8EfOGJXxhKrDw_WWgbrbifbGmzD3cFwW1g-9rPCq_Ho');
        unsplashRequest.send();

        nyTimes.open('GET',`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=fr09yzXoxLAlAc4St1Ot1PtrzDCPs5r9`);
        nyTimes.onload = addArticle;
        nyTimes.send();

})

function addImage (){
    data = JSON.parse(unsplashRequest.responseText);
    htmlContent = `<figure>
            <img src= '${data.results[0].urls.regular}' 
            alt = '${searchedForText}'>
            <figcaption>
                ${searchedForText} by ${data.results[0].user.first_name}
            </figcaption>    
        </figure>`;
         responseContainer.innerHTML = htmlContent
};

function addArticle () {
    nyTimesData = JSON.parse(nyTimes.responseText);
    htmlContentny = '<ul>'+ 
    nyTimesData.response.docs.map(articles =>
        `<li class='article'><h2><a href='${articles.web_url}'>
        ${articles.headline.main}
        </a></h2><p>${articles.snippet}</p></li>`) +'</ul>'

    responseContainer.innerHTML += htmlContentny;
}