import './assets/main.scss';
import { UI } from './classes/ui';

const ui:UI = new UI();

ui.drawListPokemons();

ui.getNext.addEventListener('click', () => ui.nextPage());
ui.getPrev.addEventListener('click', () => ui.prevPage());

ui.getOff.addEventListener('click', () => ui.offScreen());