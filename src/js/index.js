import { getUserLocation } from './api/location';
import Swiper from 'swiper';
import '../scss/index.scss';
import 'swiper/css';

const app = () => {
	const userCities = [];
	getUserLocation()
		.then((city) => {
			userCities.push(city);
			//
			const headerPoint = document.querySelector('.header_point--text');
			headerPoint.textContent = userCities[userCities.length - 1];
		})
		.catch((error) => {
			console.error(error);
		});

	const viewOn = [{ transform: 'scale(0)' }, { transform: 'scale(1)' }];
	const viewOff = [{ transform: 'scale(1)' }, { transform: 'scale(0)' }];
	const timing = { duration: 1000, iteration: 1 };

	document.addEventListener('click', ({ target }) => {
		const modalOpen = target.closest('.preview_left--button');

		if (!modalOpen) return;

		modalOpen.animate(viewOn, timing).finished.then(() => {
			modalOpen.style.display = 'flex';
		});
	});

	document.addEventListener('click', ({ target }) => {
		const modalClose = target.closest('.modal--button');

		if (!modalClose) return;

		modalClose.animate(viewOff, timing).finished.then(() => {
			modalClose.style.display = 'none';
		});
	});

	document.addEventListener('click', ({ target }) => {
		const isModal = target.closest('.modal_wrapper');

		if (!isModal) {
			const modal = target.closest('.modal');

			if (!modal) return;

			modal.animate(viewOn, timing).finished.then(() => {
				modalClose.style.display = 'none';
			});
		}
	});

	const swiper_preview = new Swiper('.review_swiper', {
		slidesPerView: 3,
		loop: true,
		speed: 1000,
		spaceBetween: 60,
		centeredSlides: true,
		slideToClickedSlide: true,
		breakpoints: {
			640: {
				spaceBetween: 20,
			},
			768: {
				spaceBetween: 40,
			},
			1024: {
				spaceBetween: 60,
			},
		},
	});
};

app();
