// inicializar variable 

const finalPrice = document.querySelector('.finalPrice')
const cart = document.getElementById('cart');
const data = localStorage.getItem('productCard');
const normalizedData = JSON.parse(data);


if (!normalizedData || normalizedData.length == []) {
    cart.innerHTML = 'No hay productos en el carrito';
    finalPrice.innerHTML = '';
}
normalizedData.forEach((product, index) => {
    cart.innerHTML += `
    
    <div class="col-sm-12 col-md-6 col-lg-4" >
 <div class="card">
 <button class="delete-btn"  data-index="${index}">X</button>
 <img id="image" src="${product.image}" class="card-img-top" alt="${product.title}">
<div class="card-body">
    <h5 class="card-title title" >${product.title}</h5>
    <p class="card-text description" >${product.description}</p>
    <p class="card-text price">${product.priceTexts}</p>
    <p>${product.stars}</p>
    <button class="btn btn-primary button" >Comprar</button>
</div>
</div> 
</div> 
    `
    product.prices = product.prices.replace('$', '');
    finalPrice.innerHTML = `Precio total: ${normalizedData.reduce((acc, product) => acc + parseFloat(product.prices), 0)}$`

    document.querySelectorAll('.button').forEach((button) => {
        button.addEventListener('click', () => {
            Swal.fire(
                'Compra exitosa!',
                'Tu producto se ha comprado correctamente!',
                'success'
            );
        });
    });
});

// Agregar controladores de eventos a los botones de eliminación
document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
        // Obtener el índice del producto a eliminar
        const index = event.target.getAttribute('data-index');

        // Eliminar el producto del carrito
        normalizedData.splice(index, 1);

        // Actualizar el carrito en localStorage
        localStorage.setItem('productCard', JSON.stringify(normalizedData));

        // Recargar la página para reflejar los cambios
        location.reload();
    });
});