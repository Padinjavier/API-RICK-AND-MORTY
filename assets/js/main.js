const URL_BASE = "https://rickandmortyapi.com/api/character"
const list = document.querySelector('#list')
const next = document.querySelector('#but-next')
const prev = document.querySelector('#but-prev')
const cont= document.querySelector('#cont')

const addClass = (element, className) => {
	element.classList.add(className)
}
const createElemet = (nameElement) => {
	return document.createElement(nameElement)
}
let value = 1
next.addEventListener('click', () =>{
	if(value<42){
		value++
		cont.textContent = value
		renderCharacters(value)
		console.log(value)
	}
	
})
prev.addEventListener('click', () =>{
	if(value>1){
		value--
		cont.textContent =value
		renderCharacters(value)
	}
})
const getCharacters = async (page=1) => {
	try {
		const response = await axios.get(URL_BASE+"?page="+value)
		return response.data.results
	} catch (error) {
		console.log(error)
		return false
	}
}
let characterList = []
const renderCharacters = async (page=1) => {

	// limpia el HTML
	list.innerHTML=""

	characterList = await getCharacters(page)

	characterList.forEach((character) => {
		//↓
		const article = createElemet('article')
		addClass(article, 'character')
		//↓
		const name = createElemet('h4')
		name.innerText = character.name
		//↓
		const figure = createElemet('figure')

		const img = createElemet('img')
		img.setAttribute('src', character.image)
		
		figure.appendChild(img)
		//↓
		const info = createElemet('div')
		addClass(info, 'info')
		//1⨅↘
		const status = createElemet('div')
		addClass(status, 'info-status')
		// ↓
		const infolive = createElemet('div')
		addClass(infolive, 'info-live')
		// ↓
		const spanspecies = createElemet('span')
		spanspecies.innerText = character.species
		if(character.species == 'Human'){
			addClass(spanspecies, 'specie-one')
		}
		if(character.species == 'Alien'){
			addClass(spanspecies, 'specie-two')
		}
		if(character.species == 'Humanoid'){
			addClass(spanspecies, 'specie-three')
		}
		if(character.species == 'unknown'){
			addClass(spanspecies, 'specie-four')
		}
		if(character.species == 'Poopybutthole'){
			addClass(spanspecies, 'specie-five')
		}
		if(character.species == 'Mythological Creature'){
			addClass(spanspecies, 'specie-six')
		}
		if(character.species == 'Animal'){
			addClass(spanspecies, 'specie-seven')
		}
		if(character.species == 'Robot'){
			addClass(spanspecies, 'specie-eight')
		}
		if(character.species == 'Cronenberg'){
			addClass(spanspecies, 'specie-nine')
		}
		if(character.species == 'Disease'){
			addClass(spanspecies, 'specie-ten')
		}
		// ↓
		const spanStatus = createElemet('span')
		addClass(spanStatus, character.status)
		// ↓.
		const spanStatusText = createElemet('span')
		spanStatusText.innerText = character.status
		//1⨅↘
		const location = createElemet('div')
		addClass(location, 'info-location')
		// ↓
		const last = createElemet('h5')
		last.innerText = 'LAST SEEN ON:'
		// ↓.
		const p = createElemet('p')
		p.innerText = character.location.name

		const origin = createElemet('div')
		addClass(origin, 'info-origin')

		const origintitle = createElemet('h5')
		origintitle.innerText='ORIGIN:'

		const origintext = createElemet('p')
		origintext.innerText = character.origin.name

		list.appendChild(article)
		article.appendChild(name)
		article.appendChild(figure)
		article.appendChild(info)

		info.appendChild(status)
		info.appendChild(location)
		info.appendChild(origin)

		status.appendChild(spanspecies)
		status.appendChild(infolive)
		
		infolive.appendChild(spanStatus)
		infolive.appendChild(spanStatusText)

		location.appendChild(last)
		location.appendChild(p)

		origin.appendChild(origintitle)
		origin.appendChild(origintext)
	})
}
const initApp = async () => {
	await renderCharacters()
}
window.onload = initApp()