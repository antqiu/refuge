document.addEventListener("DOMContentLoaded", function () {
	const latitude = document.getElementById("latitude").textContent
	const longitude = document.getElementById("longitude").textContent
	fetch(
		`https://www.refugerestrooms.org/api/v1/restrooms/by_location?lat=${latitude}&lng=${longitude}`
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			const restroom = data[0]
			console.log(restroom)
			const restroomDiv = document.createElement("div")
			restroomDiv.className = "restroom"
			restroomDiv.innerHTML = `
			<h2>${restroom.name}</h2>
			<p>${restroom.street}, ${restroom.city}, ${restroom.state}, </p>
			<p>${restroom.directions}</p>
			<p>${restroom.comment}</p>
			<p class="toTitle">Unisex: ${restroom.unisex}, Accessible: ${restroom.accessible}, Changing Table: ${restroom.changing_table}</p>
				`
			restroomDiv.classList.add("restroom")
			restroomDiv.classList.add("col-12")
			document.querySelector("#restroom").append(restroomDiv)
		}) // end of then

	var form = document.querySelector("form")
	var input = document.createElement("input")
	input.type = "hidden"
	input.name = "next"
	input.value = window.location.href
	form.append(input)
}) // end of dom
