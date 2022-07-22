//API URL
const baseURL = 'https://digimoncard.io/api-public/search.php?sort=card_number&series=Digimon Card Game';

//getting elements
const cardContainer = document.getElementById('card-container');
const btnSearch = document.getElementById('searchButton');
const textField = document.getElementById('searchField');

//radiobuttons
const colorFilters = document.querySelectorAll('.color-filter');
colorFilters.forEach(color => {
    color.addEventListener('click', async function (event) {
        if(color.checked)
        {
            colorFilters.forEach(filter =>{
                if(filter.checked){
                    if(filter.id != color.id)
                    {
                        filter.checked = false;
                    }
                }
            });
            var data = await getData('color=' + color.id + '&');
            

        }
        else{
            var data = await getData();
        }
        showCards(data);
    });
    
});


btnSearch.addEventListener('click', async () => {
    const data = await getData('n=' + textField.value + '&');
    showCards(data);
}
);

textField.addEventListener('keydown', async function(event) {
    if(event.code == 'Enter')
    {
        const data = await getData('n=' + textField.value + '&');
        showCards(data);
    }
});




async function getData(urlParameters = ''){
    const response = await fetch(`https://digimoncard.io/api-public/search.php?${urlParameters}sort=card_number&series=Digimon Card Game`);
    const data = await response.json();
    return data; 
}

function showCards(cards = ''){
    cardContainer.innerHTML = '';    
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
         const cardImage = document.createElement('img');
         cardImage.setAttribute('src', card.image_url);
         cardImage.setAttribute('alt', card.name);
        
         cardDiv.appendChild(cardImage);
         cardContainer.appendChild(cardDiv);
    });
}

async function initialize(){
    const cards = await getData();
    showCards(cards);
}
initialize();