document.addEventListener("DOMContentLoaded", function () {
	const button = document.querySelector('input[type="submit"][value="Search"]')
	button.addEventListener("click", (event) => {
		event.preventDefault()
		const parameters = {
			address: document.querySelector("#zipCode").value,
			key: "",
		}

		const queryString = Object.keys(parameters)
			.map((key) => key + "=" + parameters[key])
			.join("&")

		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${queryString}`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				const latitude = data.results[0].geometry.location.lat
				const longitude = data.results[0].geometry.location.lng
				return fetch(
					`https://www.refugerestrooms.org/api/v1/restrooms/by_location?lat=${latitude}&lng=${longitude}`
				)
			}) // end of then
			.catch((error) => {
				console.log(error)
				alert("Please verify your Zip Code is valid.")
			})
			.then((response) => response.json())
			.then((data) => {
				//do something
				document.querySelector("#restrooms_search").innerHTML = ""
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
						<form>
						<hr>
                    `
					restroomDiv.classList.add("restroom")
					restroomDiv.classList.add("col-12")
					document.querySelector("#restrooms_search").append(restroomDiv)
				} // end of for
			}) // end of second then
	}) // end of button event listener
}) //end of dom
