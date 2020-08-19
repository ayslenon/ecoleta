function populateUFs(){
    const ufselect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res)=>{return(res.json())})
    .then((states)=>{
        for (state of states){
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    });
}

populateUFs();

function getCities(event){
    const cityselect = document.querySelector("select[name=city]");
    const inputState = document.querySelector("input[name=state]");
    inputState.value = event.target.options[event.target.selectedIndex].text
    cityselect.innerHTML = `<option value="0">Selecione a cidade</option>`;
    cityselect.disabled = true;
    const valorUF = event.target.value;
    const urluf = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valorUF}/municipios`;
    fetch(urluf).then((res)=>{return(res.json())})
    .then((cities)=>{
        for (city of cities){
            cityselect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }
        cityselect.disabled = false;
    })
}

/*
    podemos fazer onde tem city.id como city.nome
    e assim n precisamos do event pra mudança de cidade
    podemos também fazer com state.id mudando para state.nome
    e assim nos livramos dos input hidden no html
*/


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);


const itemsToCollect = document.querySelectorAll(".items-grid li");

for (item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target
    itemLi.classList.toggle("selected");
    const itemId = itemLi.dataset.id;
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId;
        return itemFound;
    })
    if (alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item=>{
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })
        selectedItems = filteredItems;
    }
    else {
        selectedItems.push(itemId);
    }
    collectedItems.value = selectedItems;
}