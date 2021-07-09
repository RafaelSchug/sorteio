let group = [
    "x²+2x+1=0",
    "x²+3x+2=0",
    "x²+7x+12=0",
    "x²+6x+5=0",
    "x²+x=0",
    "x²+5x+4=0 ",
    "2x²+3x+1=0",
    "2x²+5x+2=0",
    "2x²+9x+9=0",
    "2x²+13x+15=0",
    "x²-2x+1=0",
    "x²-3x+2=0",
]

let group_mirror = [...group];
let randomizing = false;
let randomized_items_counter = 0;

const modal = document.querySelector('.modal__container');
const cont = document.querySelector('.main__container');
const ul_elm = document.querySelector('.main__container_cardsList');

const display_content = () => {
    
    for(let item in group_mirror){
        let new_li = document.createElement('li');
        new_li.className = "main__container_card";
        new_li.innerText = group_mirror[item];
        
        ul_elm.appendChild(new_li);
    }

    document.querySelector('#content_colored').innerText = group_mirror.length;
}

display_content();



const update_display = (val) => {

    if(ul_elm.children.length > 0){
        document.querySelectorAll('.main__container_card')[val].style.flex = "0 0 0%";
        document.querySelectorAll('.main__container_card')[val].style.background = "red";

        document.querySelector('#content_colored').innerText = group_mirror.length;
        
        setTimeout(()=>{
            document.querySelectorAll('.main__container_card')[val].remove();
            
        },500)
    }
}

const randomize = () => {

    if(group_mirror.length === 0){
        group_mirror = [...group];
        
        document.querySelector('.randomized_item').value = "";
        display_content();
        update_button();
        remove_randomized_items(); // Resetar a exibição dos sorteados

    } else {

        let randomN = Math.round(Math.random() * (group_mirror.length - 1));

        document.querySelector('.randomized_item').value = group_mirror[randomN];
        list_randomized_items(group_mirror[randomN]);
        group_mirror.splice(group_mirror.indexOf(group_mirror[randomN]), 1);

        update_display(randomN);
        update_button();
       
    }

}

const update_button = () => {
    if(group_mirror.length === 0){ 
        document.querySelector('#randomize_button').innerText = 'Reiniciar';
    } else { 
        document.querySelector('#randomize_button').innerText = 'Sortear';
    }
}

const randomize_prepare = ()=> {
    document.querySelector('.randomized_item').value = "";
    
    if(randomizing === false && group_mirror.length > 0) {
    
        // Alterar botao
        let button = document.querySelector('#randomize_button');
        button.style.background = "orange";
        button.innerText = "Sorteando...";

        document.querySelectorAll('.anim_targ').forEach((e)=>{
            e.classList.remove('anim_item');
        })

        setTimeout(()=>{
            document.querySelectorAll('.anim_targ').forEach((e)=>{
                e.classList.add('anim_item');
            })
        }, 10);

        randomizing = true;
        setTimeout(()=>{
            randomize();
            button.innerText = "Sortear";
            button.style.background = "";
            button.style.color = '';
            randomizing = false;
            update_button();
        }, 1000);

        return;
    } 
    
    if(randomizing === false && group_mirror.length === 0){
        randomize();
    }
}

const list_randomized_items = (val)=>{
    // console.log(`%c${val}`, "color:white; background-color:#00ac01; padding:4px;");

    const target = document.querySelector('.randomized_list');
    const newEl = document.createElement('li');
    newEl.className = "randomized_list_item";
    newEl.innerHTML = `<span class='counter'>${++randomized_items_counter}º</span><span class='span_item'>${val}</span>`;

    target.appendChild(newEl);
}

const remove_randomized_items = ()=>{
    const target = document.querySelectorAll('.randomized_list_item');
    target.forEach((e)=>{
        e.remove();
    })
    randomized_items_counter = 0;
}

const display_modal = ()=>{
    
    modal.style.display = 'initial';
    document.querySelector('#input_text').value = group.join(', ');
}

const close_modal = ()=>{
    modal.style.display = 'none';
}

const insert_data = () => {
    let data = document.querySelector('#input_text').value;
    data = data.split(',');

    document.querySelectorAll('.main__container_card').forEach((e)=>{
        e.remove();
    })

    group = [...data];
    group_mirror = [...data];

    remove_randomized_items();
    display_content();
    close_modal();
    document.querySelector('.randomized_item').value = "";
}


const toggle_data = ()=>{
    let check = ul_elm.style.display;
    let btn = document.querySelector('.button--left');

    if(check === ''){
        ul_elm.style.display = 'flex';
        btn.innerText = "Ocultar Dados"
    } else {
        ul_elm.style.display = '';
        btn.innerText = "Exibir Dados";
    }
}

// console.log("%cHello, Dev", "color:orange; background-color:black; padding:5px; font-weight:bold; font-size:12px; border-radius:4px; margin:10px;")
