/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

console.log('Happy hacking 😊')

const url = 'https://platzi-avo.vercel.app/api/avo';
const baseUrl = 'https://platzi-avo.vercel.app/';
const appNode = document.querySelector('#app');
//Web Api

let data;


// fetch(url)
//     .then(data => data.json())
//     .then(response => {
//         console.log(response);
//         const todosLosItems = [];

//         response.data.forEach(item => {
//             const img = document.createElement('img');
//             const title = document.createElement('h3');
//             const price = document.createElement('div');
//             const container = document.createElement('div');
//             container.append(img, title, price);
//             todosLosItems.push(container);
//         });
//         document.body.append(...todosLosItems);
//     })


/*
contectarnos al server
procesar la respuesta y convertirla en JSON
JSON ->  Data -> renderizar info en el browser
*/
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN',{
        style: 'currency',
        currency: 'USD'
    }).format(price);
    return newPrice;
};

async function getAllData() {
    const result = await fetch(`${baseUrl}api/avo`);
    data = await result.json();
    console.log(data)
    const todosLosItems = [];
    data.data.forEach(item => {
        console.log(item.name);
        //crear imagen
        const imagen = document.createElement('img');
        //URL de la imagen
        imagen.src = `${baseUrl}${item.image}`;
        imagen.className = 'h-28'
        //crear titulo
        const boxContent = document.createElement('div');
        boxContent.className = 'flex flex-col flex-wrap content-center'
        
        const title = document.createElement('h3');
        title.textContent = item.name;
        title.className = 'text-gray-800 text-xl font-semibold text-left';
        //crear precio
        const price = document.createElement('div');
        price.textContent = formatPrice(item.price);
        price.className = 'text-left mt-5'
        const container = document.createElement('div');
        container.className = 'container grid grid-cols-2 gap-4  rounded-2xl p-3 shadow hover:bg-gray-200';

        boxContent.append(title, price);
        container.append(imagen, boxContent);

        todosLosItems.push(container);
    });
    appNode.className = 'grid grid-cols-3 gap-4 mt-8';
    appNode.append(...todosLosItems);
}

getAllData();