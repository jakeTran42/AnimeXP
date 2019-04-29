export const SAVE_MOST_POPULAR = "anime:saveMostPopular";
export function onSaveMostPopularAnime(mostPopularAnime) {
  //console.log('Save most popular called')
  return {
    type: SAVE_MOST_POPULAR,
    payload: {
      mostPopular: mostPopularAnime
    }
  }
}

export const UPDATE_EXISTING_ANIME_LIST = "anime:updateExistingAnimeList";
export function updateExistingAnimeList(animeList) {
  //console.log(UPDATE_EXISTING_ANIME_LIST);
  return {
    type: UPDATE_EXISTING_ANIME_LIST,
    payload: {
      animeList: animeList
    }
  }
}

export const SAVE_NEW_ANIME_LIST = "anime:saveNewAnimeList";
export function saveNewAnimeList(animeList) {
  //console.log(SAVE_NEW_ANIME_LIST);
  return {
    type: SAVE_NEW_ANIME_LIST,
    payload: {
      animeList: animeList
    }
  }
}

export const SAVE_ALL_ANIME_LISTS = "anime:saveAllAnimeLists";
export function saveAllAnimeLists(animeLists) {
  //console.log(SAVE_ALL_ANIME_LISTS);
  return {
    type: SAVE_ALL_ANIME_LISTS,
    payload: {
      animeLists: animeLists
    }
  }
}


//OLD
export const UPDATE_ALL_ANIME = "anime:updateAllAnime"
export const UPDATE_AN_ANIME = "anime:updateAnAnime"
export const SAVE_CURRENT_ANIME = "anime:saveCurrentAnime"

export function updateAllAnime(allAnime) {
  //console.log("All anime actions called", allAnime)
  return {
    type: UPDATE_ALL_ANIME,
    payload: {
      anime: allAnime
    }
  }
}

export function updateAnAnime(anAnime) {
  return {
    type: UPDATE_AN_ANIME,
    payload: {
      anime: anAnime
    }
  }
}

export function saveCurrentAnime(anAnime) {
  return {
    type: SAVE_CURRENT_ANIME,
    payload: {
      currentAnime: anAnime
    }
  }
}
