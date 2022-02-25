window.alert('The data has originally come from tvmaze.com');
let row = document.querySelector('.row');
//createcard function creates all our cards by "for of" loop
function createCard(show) {
    // console.log(show);
    //here show is our data 
    for(let episode of show){
        //creating card for each episode
        let row = document.querySelector('.row');
        const card = document.createElement('div');
        card.classList.add('card');
        row.append(card);
        
        const figure = document.createElement('figure');
        let figcaption = document.createElement('figcaption');
        let img = document.createElement('img');
        img.src = episode.image.medium;
        figcaption.innerHTML = episode.summary;
        img.classList.add('img');
        figure.append(img);
        figure.append(figcaption);
        card.append(figure);
        
        const pEpisodeName = document.createElement('p');
        if(episode.number >= 10){
            pEpisodeName.innerText = `${episode.name} - S0${episode.season}E${episode.number}`;
        }else{
            pEpisodeName.innerText = `${episode.name} - S0${episode.season}E0${episode.number}`;
        }

        const bottomDiv = document.createElement('div');
        bottomDiv.classList.add('bottom-div')
        const aWatch = document.createElement('a');
        const iPlay = document.createElement('div');
        iPlay.classList.add('play-icon-container');
        iPlay.innerHTML = '<i class="fa fa-angle-right"></i>';
        aWatch.innerText = 'Wanna Watch?';
        aWatch.href = episode.url;
        const pTime = document.createElement('p');
        pTime.innerText = 'airtime: ' + episode.airtime;
        const iTime = document.createElement('div');
        iTime.classList.add('time-icon-container')
        iTime.innerHTML = '<i class="fa fa-angle-right"></i>';
        card.append(bottomDiv);
        aWatch.classList.add('a-watch');
        pTime.classList.add('p-time');
        iPlay.append(aWatch);
        iTime.append(pTime);
        bottomDiv.append(pEpisodeName)
        bottomDiv.append(iPlay, iTime);
        
    } 
} 

//this function creates select option
const selectEpisode = show => {
    
    for(let episode of show){
        let option = document.createElement('option');
        option.value = episode.name;
        if(episode.number >= 10){
            option.innerText = `S0${episode.season}E${episode.number} - ${episode.name} `;
        }else{
            option.innerText = `S0${episode.season}E0${episode.number} - ${episode.name} `;
        }
        select.append(option);
    }
 }

const pCounter = document.querySelector('.card-counter');
//making request with async funntion
const getData = async() =>{
    const data = await axios('https://api.tvmaze.com/shows/527/episodes');
    const show = data.data;
    // console.log(show);

    //all episodes are shown! displaying (number of all episodes)/(number of all episodes ) episodes
    pCounter.innerText = `displaying ${show.length}/${show.length} episodes`;
    createCard(show);

    //passing data to our select option 
    selectEpisode(show);
    
    //this function uses addEventListener. we check if our searchs match any episode name, then we will store episodes data in searchData variable.
    const searchInput = document.querySelector('input');
    const searchEpisode = () =>{
        searchInput.addEventListener('keyup', event =>{
        event.preventDefault;
        row.textContent ='';

        const searchData = show.filter((episode) => episode.name.toLowerCase().includes(event.target.value.toLowerCase()));
        // console.log(searchData);
        //search result counter! displaying (number of founded episodes)/(number of all episodes) episodes
        pCounter.innerText = `displaying ${searchData.length}/${show.length} episodes`;
        
        //making card for matched episodes
        createCard(searchData);

    });
}
    searchEpisode();

    //remember each option has a value which is episode name (line 60). 
    const selectChange = () =>{
        select.addEventListener('change', event => {
            row.textContent ='';
        
            // console.log(event.target.value);
            const selectData = show.filter(episode => event.target.value === episode.name);
            // console.log(selectData);
            //only first option (all episode) is an empty array, we need to create cards for all episodes. 
            if(selectData.length){
                createCard(selectData);
            } else {
                createCard(show);
            }   
        });
    }
    selectChange()
}

getData();