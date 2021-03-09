import { consultAPI, colours } from '../helper/helper';
import { Data } from '../helper/typeObjects';

export class UI {

	private screenRight:any = document.querySelector('.screen-right__screen');
	private screenLeft:any = document.querySelector('.screen-left__screen');
	private prev:any = document.getElementById('prev');
	private next:any = document.getElementById('next');
	private btnOff:any = document.querySelector('.screen-left__btn-container--btn');
	private init:number = 0;
	private end:number = 20;

	public get getPrev():any {

		return this.prev;
	}

	public get getNext():any {

		return this.next;
	}

	public get getOff():any {

		return this.btnOff;
	}

	public async drawListPokemons() {

		const arrConsult:any = await consultAPI();
		const mapPokemons:any = arrConsult.reduce((acc:any, el:any) => (acc[el.name] = el, acc), {});
		let html:string = '<div>';

		for (let i:number = this.init; i < (this.end - 10); i++) html += `<p class="name-pokemon">${i+1}. ${arrConsult[i].name}</p>`;

		html += '</div> <div>';

		for (let i:number = (this.end - 10); i < this.end; i++) html += `<p class="name-pokemon">${i+1}. ${arrConsult[i].name}</p>`;
		
		html += '</div>';

		this.screenRight.innerHTML = html;
		this.informationPokemon(mapPokemons);
	}

	public nextPage():void {
		
		if (this.end === 100) return;

		this.init = this.init + 20;
		this.end = this.end + 20;

		this.drawListPokemons();
	}

	public prevPage():void {

		if (this.init === 0) return;

		this.init = this.init - 20;
		this.end = this.end - 20;

		this.drawListPokemons();
	}

	private informationPokemon(mapPokemons:any):void {

		Array.from(document.querySelectorAll('.name-pokemon')).forEach((pokemon:any) => {

			pokemon.addEventListener('click', async () => {
				
				this.screenLeft.innerHTML = `<div class="container-spinner"><div class="lds-hourglass"></div></div>`;

				const pokemonName:string = pokemon.textContent.match(/[a-z]+-?[a-z]*/gi)[0];
				const dataPokemon = await fetch(mapPokemons[pokemonName].url);
				const respPokemon = await dataPokemon.json();

				const data:Data = {
					id: respPokemon.id,
					name: respPokemon.name,
					height: respPokemon.height,
					weight: respPokemon.weight,
					powers: respPokemon.types.map((el:any) => el.type.name),
					img: [
						respPokemon.sprites.front_default,
						respPokemon.sprites.back_default,
					]
				}

				dataPokemon.status === 200 && this.drawInformationPokemon(data)
			});
		});
	}

	private drawInformationPokemon(data:Data):void {

		this.screenLeft.style.backgroundColor = colours[data.powers[1] || data.powers[0]];
		const id:string = `00${data.id}`.slice(-3);

		let htmlTemplete:string = `
			<div class="name-id">
				<h2 class="screen-left__screen--title">${data.name}</h2>
				<p>#${id}</p>
			</div>

			<div class="container-img">
		`;

		data.img.forEach((img:string) => htmlTemplete += `<img src="${img}" alt="${data.name}" />`);
		htmlTemplete += `
			</div>

			<div class="container-statistics">
				<div>
		`;

		data.powers.forEach((power:string, i:number) => {

			htmlTemplete += `<p class="powers" style="background-color:${colours[data.powers[i]]};">${power}</p>`;
		});

		htmlTemplete += `
				</div>

				<div class="weight-height">
					<p>Weight: ${data.weight}</p>
					<p>Height: ${data.height}</p>
				</div>
			</div>
		`;

		this.screenLeft.innerHTML = htmlTemplete;
	}

	public offScreen() {

		this.screenLeft.innerHTML = '';
		this.screenLeft.style.backgroundColor = 'white';
	}
}