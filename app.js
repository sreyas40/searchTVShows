const searchForm = document.querySelector('#searchForm');
const resultsContainer = document.querySelector('.results');




searchForm.addEventListener('submit', async (e) => {
   e.preventDefault()
   const query = searchForm.elements.query.value;
   try {
      const config = { params: { q: query } }
      const getTvShows = await axios.get("https://api.tvmaze.com/search/shows", config);
      makeTvShows(getTvShows.data)
   } catch(e) {
      console.log("API fetch failed")
      console.log(e)
   }
})

function makeTvShows(TVshows) {
   for (let item of TVshows) {
      const showContainer = document.createElement('DIV');
      const showBanner = document.createElement('IMG');
      const showTitle = document.createElement('H2');
      showTitle.append(item.show.name);
      if (item.show.image.medium) {
         showBanner.src = item.show.image.medium;
      }
      resultsContainer.append(showContainer);
      showContainer.append(showBanner);
      showContainer.append(showTitle);
      
   }
}