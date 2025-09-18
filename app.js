let amigos = [];

function agregarAmigo(){
    let nombre = document.getElementById('amigo').value;
    if(amigos.includes(nombre) || nombre==''){
        alert(amigos.includes(nombre) ? 'Ya existe un amigo con ese nombre' : 'Debe ingresar un nombre');
        caja();
        return;
     }

    amigos.push(nombre);
    document.getElementById('listaAmigos').innerHTML = amigos.map(nombre=>`<li>${nombre}</li>`).join('');
    caja();
}

function reiniciar(){
    amigos = [];
    ['listaAmigos', 'resultado'].forEach(id => document.getElementById(id).innerHTML = '');
    ['sortearAmigo', 'limpiar', 'añadir', 'amigo'].forEach(id => document.getElementById(id).disabled = false);
    caja();
}

function sortearAmigo() {
    if (amigos.length < 3){
        alert('Debe ingresar al menos 3 amigos');
        return;
    }

    let indice = Math.floor(Math.random() * amigos.length);
    let amigoSecreto = amigos[indice];
    document.getElementById("resultado").innerHTML = "Tu amigo secreto es: " + amigoSecreto;
}

function revelarAmigo(tarjeta, amigoSecreto){
    let contenidoOriginal = tarjeta.innerHTML;
    tarjeta.innerHTML = `<h3>Tu amigo secreto es: </h3> <h2>${amigoSecreto}</h2>`;
    tarjeta.onclick = null;
    tarjeta.classList.add('revelada');

    setTimeout(function(){
        tarjeta.innerHTML = contenidoOriginal;
        tarjeta.classList.remove('revelada');
        tarjeta.onclick = function(){
            revelarAmigo(tarjeta, amigoSecreto);
        };
    }, 2000);
}

function borrarAmigo() {
    if(amigos.length === 0) return;

    amigos.pop();
    const lista = document.getElementById('listaAmigos');
    lista.removeChild(lista.lastElementChild);
}

function caja(){
    document.getElementById('amigo').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const inputAmigo = document.getElementById('amigo');
    
    inputAmigo.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            agregarAmigo();
        }
    });
});
