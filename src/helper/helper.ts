import { Colours } from './typeObjects';

export const consultAPI = async () => {

	const consult = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
	const resp = await consult.json();
	const { results } = resp;
	
	return results;
}

export const colours:Colours = {
	poison: "#A95CA0", grass: "#8CD750", electric: "#FDE139", psychic: "#FA65B4", 
	flying: "#78A2FF", water: "#3194d6", steel: "#C4C2DB", normal: "#d89e5c", 
	ice: "#96F1FF", ground: "#EECC55", fire: "#FA5643", dragon: "#8673FF", 
	bug: "#C2D21E", fairy: "#F9AEFF", fighting: "#A75543", rock: "#CCBD72", 
	ghost: "#7975D7", dark: "#000000",
}