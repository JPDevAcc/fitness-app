// Reducer for all common user state

import { defaults as prefsDefaults } from "../../views/UserPrefs" ;
import { defaults as profileDefaults } from "../../views/UserProfile" ;

function combineWithDefaults(defaults, obj) {
	const newObj = { ...defaults } ;
	for (const [key, value] of Object.entries(obj)) {
		if (value !== null) newObj[key] = value ;
	}
	return newObj ;
}

export const reducer = (state, action) => {
	//console.log("Action:", action) ;
  switch (action.type) {
    case "setPrefs":
			//console.log("COMBINED: ", combineWithDefaults(prefsDefaults, action.data)) ;
      return {...state, prefs: combineWithDefaults(prefsDefaults, action.data)} ;
    case "setProfile":
			//console.log("COMBINED: ", combineWithDefaults(profileDefaults, action.data)) ;
      return {...state, profile: combineWithDefaults(profileDefaults, action.data)} ;
    default:
      return state ;
  }
}

export const initialState = {} ;