
function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;

}
Seguro.prototype.cotizarSeguro = function(){
    //console.log(this.marca);
    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }

    //lectura de año
    const diferencia = new Date().getFullYear() - this.anio; 
    cantidad -= ((diferencia * 0.03 ) * cantidad)
    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    //console.log(cantidad);
    //por cada año menos 3%
    //console.log(diferencia);
    return cantidad;
}

function Interfaz(){}



Interfaz.prototype.mostrarError = (mensaje,tipo)=>{
    const div = document.createElement('div');

    if(tipo === 'error') {
        div.classList.add('mensaje','error');
    }else{
        div.classList.add('mensaje','correcto');
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div,document.querySelector('.form-group'));

    setTimeout(()=>{
        document.querySelector('.mensaje').remove();
    },3000);
}

//imprime resultado de cotizacion
Interfaz.prototype.mostrarResultado = function(seguro,total){
    const resultado = document.getElementById('resultado');
    let marca;
    switch (seguro.marca) {
        case '1':
        marca = 'Americano';
            break;
        case '2':
        marca = 'Asiatico';
            break;
        case '3':
        marca = 'Europeo';
            break;
    
        default:
            break;
    }

    const div = document.createElement('div');

    div.innerHTML = `
                    <p class='header'>Tu Resumen:</p>
                    <p>Marca ${marca}</p>
                    <p>Año: ${seguro.anio}</p>
                    <p>Tipo: ${seguro.tipo}</p>
                    <p>Total: $ ${total}</p>
    
    
    `;
    const spinner = document.querySelector('#cargando img');
    spinner.style.display='block';
    setTimeout(()=>{
        
        spinner.style.display='none';
        resultado.appendChild(div);
    },2000);

    console.log(marca);
}


//EventListeners
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    //console.log('click');
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    //console.log(marcaSeleccionada);
    const anio = document.getElementById('anio');
    const anioSeleccionada = anio.options[anio.selectedIndex].value;

    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    //console.log(tipo);
    //creando instancia de interfaz
    const interfaz = new Interfaz();

    //revisar campos vacios
    if (marcaSeleccionada === '' || anioSeleccionada === '' || tipo === '') {
        interfaz.mostrarError('Faltan algunos datos','error');
    }else{

        //limpiar resultados 
        const resultados = document.querySelector('#resultado div');
        if (resultados != null) {
            resultados.remove();
        }




        const seguro = new Seguro(marcaSeleccionada,anioSeleccionada,tipo);
        const cantidad = seguro.cotizarSeguro();
        //mostrar resultado
        interfaz.mostrarResultado(seguro,cantidad);

    }



});


const max = new Date().getFullYear(), min = max - 20;

const selectAnios = document.getElementById('anio');

for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
   // console.log(i);
}