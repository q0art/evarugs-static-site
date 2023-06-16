import '../scss/index.scss';
import { getUserLocation } from './location';

const app = () => {
	//
	getUserLocation();

	const modalWindow = document.querySelector('.modal');
	const modalButtonOpen = document.querySelector('.preview_left--button');
	const modalButtonClose = document.querySelector('.modal--button');

	modalButtonOpen.addEventListener('click', () => {
		modalWindow.classList.add('visible_modal');
	});

	modalButtonClose.addEventListener('click', () => {
		modalWindow.classList.remove('visible_modal');
	});

	modalWindow.addEventListener('click', (event) => {
		const isModal = event.target.closest('.modal_wrapper');

		if (!isModal) {
			modalWindow.classList.remove('visible_modal');
		}
	});
};

app();
