//DOM Selectors
const button = document.querySelector('.add-list-button');
const parag = document.querySelector('.input-text');
const todoContainer = document.querySelector('.todo-container');
const ul = document.querySelector(".ul-todo");
const filterOption = document.querySelector(".filter");
const btnClear = document.getElementById("clearbtn");
const arrOption = Array.from(filterOption.options);


//Add Events 
button.addEventListener("click" , add);
btnClear.addEventListener("click" , clear);
filterOption.addEventListener("click" , filter);

//add opacity 0 , pointer events none to btn clear
if(ul.childElementCount <= 0)
{
    btnClear.style.cssText = `opacity: 0; pointer-events: none`;
}

//Function
function add(event)
{
    event.preventDefault();

    const div = document.createElement('div');
    div.classList.add('div-container');
    div.classList.add("no-completed");
    div.addEventListener("click" , check);

    const li = document.createElement('li');
    li.classList.add('li-element');
    li.innerHTML = parag.value;
    parag.value = " ";
    div.appendChild(li);

    const btnCheck = document.createElement('button');
    btnCheck.classList.add("btn-check");
    btnCheck.innerHTML = '<i class="fas fa-check"></i>';
    div.appendChild(btnCheck);

    const btnDel = document.createElement('button');
    btnDel.innerHTML = '<i class="fas fa-trash"></li>';
    btnDel.classList.add('btn-delete');
    div.appendChild(btnDel);

    ul.appendChild(div);

    //Add opacity 1 , pointer event to clear btn
    btnClear.style.cssText = `opacity: 1; pointer-events: all;`;
}

//clear function for clear list
function clear()
{
    ul.innerHTML = "";
    let para = document.createElement("h2");
    ul.appendChild(para);
    para.innerHTML = "Clear Completed!";
    para.style.cssText = `color: white;`;
    anime(
        {
            targets: para,
            scale: [0 , 1],
            duration: 1000,
            easing: 'easeInOutExpo'
        }
    );

    setTimeout(()=>{
        anime(
            {
                targets: para,
                scale: [1 , 0],
                duration: 2000,
                easing: 'easeInOutExpo'
            }
        );
    } , 3000);

    setTimeout(()=>{
        ul.removeChild(para);
    } , 5000);
}

//check function for btn check and delete
function check(btn)
{
    const element = btn.target;
    if(element.classList[0] === "btn-delete")
    {
        const dad = element.parentElement;
        dad.classList.add("transition-btn");
        dad.addEventListener("transitionend" , function(){
            dad.style.dispaly = "none";
            dad.remove();
        });
    }

     if(element.classList[0] === "btn-check")
    {
        element.classList.add("bc");
        const father = element.parentElement;
        father.classList.add("completed");
        father.classList.toggle("no-completed");
    }
}

//filter function select/option
function filter(e)
{
    if(ul.children.length >= 1)
    {
        const divs = Array.from(ul.children);
        divs.forEach(item =>{
            let cls = item.classList;
            
            cls.forEach(clas =>{
                switch(e.target.value)
                {
                    case "all":
                        if(clas == "div-container")
                        {
                            item.style.cssText = `display: flex`;
                        }
                        break;

                    case "com":
                        if(clas == "completed")
                        {
                            item.style.cssText = `display: flex`;
                        }
                        if(clas == "no-completed")
                        {
                            item.style.cssText = `display: none`;
                        }
                        break;

                    case "nocom":
                        if(clas == "no-completed")
                        {
                            item.style.cssText = `display: flex`;
                        }
                        if(clas == "completed")
                        {
                            item.style.cssText = `display: none`;
                        }
                        break;
                }
            });
        });
    }
}