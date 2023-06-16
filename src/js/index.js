import { getUserLocation } from './location';
import Swiper from 'swiper';
import '../scss/index.scss';
import 'swiper/css';

const app = () => {
	//
	getUserLocation();

	const modalWindow = document.querySelector('.modal');
	const modalButtonOpen = document.querySelector('.preview_left--button');
	const modalButtonClose = document.querySelector('.modal--button');

	modalButtonOpen.addEventListener('click', () => {
		modalWindow.classList.add('visible_modal');
		modalWindow.classList.add('e-on');
	});

	modalButtonClose.addEventListener('click', () => {
		modalWindow.classList.remove('visible_modal');
		modalWindow.classList.remove('e-on');
	});

	modalWindow.addEventListener('click', (event) => {
		const isModal = event.target.closest('.modal_wrapper');

		if (!isModal) {
			modalWindow.classList.remove('visible_modal');
		}
	});

	const swiper = new Swiper('.swiper', {
		slidesPerView: 3,
		loop: true,
		speed: 1000,
		spaceBetween: 60,
		centeredSlides: true,
		slideToClickedSlide: true,
		breakpoints: {
			640: {
				slidesPerView: 3,
				loop: true,
				spaceBetween: 20,
			},
			768: {
				loop: true,
				slidesPerView: 3,
				spaceBetween: 40,
			},
			1024: {
				loop: true,
				slidesPerView: 3,
				spaceBetween: 60,
			},
		},
	});
};

app();
