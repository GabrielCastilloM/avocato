/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

// tilizando fetch
// async function fetchData() {

//       const response = await fetch(url),
//       data = await response.json()
//       console.log(data);

// }

// fetchData()


const url = "https://platzi-avo.vercel.app/api/avo";
//const baseUrl = "https://platzi-avo.vercel.app/";
const appNode = document.querySelector('div#app')


// intl para dar formato a fechas y a monedas
const formatPrice = (price) => {
        const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD'
    }).format(price)
    
    return newPrice
}


// pasos
// web api
// Conectarnos al servidor
window
    .fetch(url)
    //.fetch(`${baseUrl}/api/avo`)
//Procesar la respuesta y convertirla a JSON
    .then((respuesta) => respuesta.json())
//JSON -> Data ->  renderizar info en el browser
    .then((respuestaJson) => {
        const todosLosItem = []
        respuestaJson.data.forEach(item => {
            //crear imagen
            const imagen = document.createElement('img')
            //podemos usar cualquier metodo para cortar la cadena de texto
            //substring  o slice este ultimo acepta numeros negativos
            //url de la imagen
            let baseUrl = url.slice(-0, -7)
            imagen.src = `${baseUrl}${item.image}`
            imagen.className = "imagen row-span-3 w-3/3 rounded-full h-24 w-24 flex items-center justify-center"
            //crear titulo
            const title = document.createElement('h2')
            title.textContent = item.name;
            title.className= 'titulo col-span-2 w-2/3 '
            //crear precio
            const price = document.createElement('div')
            price.className = "text-gray-600 col-span-2 w-2/3"
            price.textContent = formatPrice(item.price)

            const container = document.createElement('div')
            container.className ="container shadow-xl border-2 border-indigo-600 rounded-md grid grid-flow-col grid-cols-3 grid-rows-2 gap-4"
            container.append(imagen, title, price)

            todosLosItem.push(container)
        });
        //agregamos todo dentro de appNode que es un nodo creado en html
        appNode.append(...todosLosItem)
    });

    appNode.className = "grid grid-cols-2 gap-6"