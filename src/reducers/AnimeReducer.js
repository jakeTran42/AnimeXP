import {
  SAVE_CURRENT_ANIME, SAVE_MOST_POPULAR, SAVE_NEW_ANIME_LIST, SAVE_ALL_ANIME_LISTS,
  UPDATE_EXISTING_ANIME_LIST,
  //OLD
  UPDATE_ALL_ANIME, UPDATE_AN_ANIME
} from '../actions/AnimeActions'
export default function animeReducer(state={}, { type, payload }) {
  let lists = state.animeLists;
  switch (type) {
    case UPDATE_EXISTING_ANIME_LIST:
      //console.log("UPDATE_EXISTING_ANIME_LIST:", payload);
      for (let i = 0; i < payload.animeList.length; i++) {
        let index = lists.findIndex((animeObj) => {
          return animeObj['_id'] == payload.animeList[i]['_id']
        });
        lists[index] = payload.animeList[i];
      }
      return {
        ...state,
        animeLists: lists
      }
    case SAVE_MOST_POPULAR:
      //console.log("SAVE_MOST_POPULAR: ", payload)
      return {
        ...state,
        mostPopular: payload.mostPopular
      }

    case SAVE_CURRENT_ANIME:
      //console.log("SAVE_CURRENT_ANIME: ", payload)
      return {
        ...state,
        currentAnime: payload.currentAnime
      }

    case SAVE_NEW_ANIME_LIST:
      //console.log("SAVE_NEW_ANIME_LIST: ", payload)
      lists.push(payload.animeList);
      return {
        ...state,
        animeLists: lists
      }

    case SAVE_ALL_ANIME_LISTS:
      //console.log("SAVE_ALL_ANIME_LISTS: ", payload)
      return {
        ...state,
        animeLists: payload.animeLists
      }


    // OLD
    case UPDATE_ALL_ANIME:
      //console.log("All anime reducer called, payload: ", payload)
      return {
        ...state,
        anime: payload.anime
      }
    case UPDATE_AN_ANIME:
      state.anime[Object.keys(state.animes).length] = payload.anime
      let anime = {}
      anime["anime"] = state.anime
      return {
        ...state,
        anime
      }
    default:
      return {...state};
  }
}
