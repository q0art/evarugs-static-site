export const getUserLocation = () => {
	const headerPoint = document.querySelector('.header_point--text');

	const success = (pos) => {
		const { latitude } = pos.coords;
		const { longitude } = pos.coords;
		const api = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`;

		fetch(api)
			.then((res) => res.json())
			.then((data) => {
				if (data.locality) {
					headerPoint.textContent = data.city;
				} else {
					headerPoint.textContent = 'Ваш гoрoд';
				}
			});
	};

	const error = () => {
		const ip = '';
		const http = new XMLHttpRequest();

		http.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				const jsonData = JSON.parse(this.responseText);
				if (jsonData.locality) {
					headerPoint.textContent = jsonData.city;
				} else {
					headerPoint.textContent = 'Ваш гoрoд';
				}
			}
		};
		http.open('GET', `https://ipwhois.app/json/?lang=ru${ip}`, true);
		http.send();
	};
	navigator.geolocation.getCurrentPosition(success, error);
};
