document.addEventListener("DOMContentLoaded", function () {
	navigator.geolocation.getCurrentPosition((position) => {
		const { latitude, longitude } = position.coords
		// Show a map centered at latitude / longitude.

		const parameters = {
			lat: latitude,
			lng: longitude,
		}

		const queryString = Object.keys(parameters)
			.map((key) => key + "=" + parameters[key])
			.join("&")

		fetch(
			`https://www.refugerestrooms.org/api/v1/restrooms/by_location?${queryString}`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				for (let i = 0; i < data.length; i++) {
					const restroom = data[i]
					const restroomDiv = document.createElement("div")
					restroomDiv.className = "restroom"
					restroomDiv.innerHTML = `
                        <h2>${restroom.name}</h2>
                        <p>${restroom.street}, ${restroom.city}, ${restroom.state}, </p>
                        <p>${restroom.directions}</p>
                        <p>${restroom.comment}</p>
						<p class="toTitle">Unisex: ${restroom.unisex}, Accessible: ${restroom.accessible}, Changing Table: ${restroom.changing_table}</p>
						<form action="/restrooms/${restroom.id}" method="GET">
							<input type="hidden" name="restroom" value="${restroom.name}">
							<input type="hidden" name="latitude" value="${restroom.latitude}">
							<input type="hidden" name="longitude" value="${restroom.longitude}">
							<input type="submit" value="View More" />
						</form>
						<hr>
                    `
					restroomDiv.classList.add("restroom")
					restroomDiv.classList.add("col-12")
					document.querySelector("#restrooms").append(restroomDiv)
				} // end of for
			}) // end of then
	}) // end of navigator.geolocation
}) // end of domcontent loaded
