// Iterar sobre cada elemento
const products = document.querySelector('.products');

function ratingToStars(rating) {
  // Redondea la calificación al número entero más cercano
  const roundedRating = Math.round(rating);

  // Crea una cadena de estrellas basada en la calificación redondeada
  let stars = '';
  for (let i = 0; i < roundedRating; i++) {
      stars += '⭐';
  }

  return stars;
}

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        data.forEach(product => {
            const stars = ratingToStars(product.rating.rate);
            products.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-4" >
            <div class="card">
            <img  src="${product.image}" class="card-img-top image" alt="${product.title}">
            <div class="card-body">
                <h5 class="card-title title" >${product.title}</h5>
                <p class="card-text description" >${product.description}</p>
                <p class="card-text priceText"><strong class="price">${product.price}$</strong></p>
                <p>${stars}</p>
                <button class="btn btn-primary button" >Agregar al carrito</button>
            </div>
            </div> 
            </div> 
            `
        });

        const descriptions = document.querySelectorAll('.description');
        const images = document.querySelectorAll('.image');
        const titles = document.querySelectorAll('.title');
        const prices = document.querySelectorAll('.price');
        const buttons = document.querySelectorAll('.button'); 
        let priceTexts = document.querySelectorAll('.priceText');

        buttons.forEach((button, index) => {
            const description = descriptions[index];
            const image = images[index];
            const title = titles[index];
            const price = prices[index]
            const priceText = priceTexts[index]

            const addToCart = {
                title: title.innerHTML,
                description: description.innerHTML,
                image: image.src,
                prices: price.innerHTML,
                priceTexts: priceText.innerHTML,
                stars: ratingToStars(data[index].rating.rate),
            }

            button.addEventListener('click', () => {
              Swal.fire({
                  title: '¿Estás seguro?',
                  text: "¡Vas a agregar este producto al carrito!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: '¡Sí, agregar al carrito!'
              }).then((result) => {
                  if (result.isConfirmed) {
                      // Recuperar el carrito del localStorage
                      let cart = JSON.parse(localStorage.getItem('productCard')) || [];
      
                      // Agregar el nuevo producto al carrito
                      cart.push(addToCart);
      
                      // Guardar el carrito actualizado en el localStorage
                      localStorage.setItem('productCard', JSON.stringify(cart));
      
                      Swal.fire(
                          '¡Agregado!',
                          'Tu producto ha sido añadido al carrito.',
                          'success'
                      )
                  }
              })
          });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchProducts();