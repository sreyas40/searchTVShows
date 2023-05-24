const searchForm = document.querySelector('#searchForm');
const resultsContainer = document.querySelector('.results');
const showContainer = document.createElement('DIV');



searchForm.addEventListener('submit', async (e) => {
   e.preventDefault()
   const query = searchForm.elements.query.value;

   try {
      clearResults()
      const config = { params: { q: query } }
      const getTvShows = await axios.get("https://api.tvmaze.com/search/shows", config);
      makeTvShows(getTvShows.data);
      console.log("results")
      console.log(getTvShows.data)
   } catch (e) {
      console.log("fetch failed")
      console.log(e)
   }
})
function clearResults() {
   const length = resultsContainer.children.length;
   for (let i = 0; i < length; i++) {
      resultsContainer.removeChild(resultsContainer.lastElementChild)
   }
}
function makeTvShows(TVshows) {

   for (let item of TVshows) {
      const showContainer = document.createElement('DIV');
      showContainer.classList.add("showContainer");
      const showBanner = document.createElement('IMG');
      showBanner.classList.add("showBanner");
      const showTitle = document.createElement('H2');
      showTitle.classList.add("showTitle");
      showTitle.append(item.show.name);

      if (item.show.image !== null) {
         showBanner.src = item.show.image.original;
      }
      else {
         showBanner.src = "images/rollback.svg";
         showBanner.style.width = "40%";
      }

      resultsContainer.append(showContainer);
      showContainer.append(showBanner);
      showContainer.append(showTitle);

   }
}