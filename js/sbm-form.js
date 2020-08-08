const mail = document.querySelector('#user_mail');
const mobile = document.querySelector('#user_mobile');
const inputFields = document.querySelectorAll('.form-input')
const form = document.querySelector('form');
let timerID = 0;

const fieldKeyUpHandler = (e) => {
    const { target: elem } = e;
    if(elem.value){
        const preloader = document.querySelector(`#preloader-${elem.id}`);
        const errFb = document.querySelector(`#err-fb-${elem.id}`);
        const _id = elem.id;
        timerID = setTimeout(() => {
            preloader.classList.add('active');
            const regex = _id === 'user_mail' 
            ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            :  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            let isValid = regex.test(elem.value);

            setTimeout(() => {
                isValid ? errFb.classList.add('ok') : errFb.classList.remove('ok')

                errFb.innerHTML = !isValid 
                ? `Debe ingresar un ${_id === 'user_mail' ? "correo electrónico" : "número telefónico"} válido.`
                : `Este ${_id === 'user_mail' ? "correo electrónico" : "número telefónico"} es válido.`;

                preloader.classList.remove('active')
            }, 1000);
            
        }, 800)
    }
}

const fieldsBlurHandler = (e) => {
    const { target: trgt } = e;
    const errElem = document.querySelector(`small[aria-labelledby="err[${trgt.id}]"]`)
    if(trgt.value.length < 1) errElem.innerHTML = 'Este campo es requerido.';
    if(errElem.id !== 'err-fb-user_mail' && errElem.id !== 'err-fb-user_mobile'){
        if(trgt.value.length > 0) errElem.innerHTML = '';
        if(errElem.innerHTML.length > 0) errElem.classList.remove('ok')
    }

}

const formSubmitHandler = (e) => {
    e.preventDefault();
    const fields = document.querySelectorAll('*[required]');
    let ok = true;
    fields.forEach((elem) => {
        const errElem = document.querySelector(`small[aria-labelledby="err[${elem.id}]"]`)
        if(elem.value.length < 1){
            errElem.innerHTML = 'Este campo es requerido.';
            ok = false;
        }
        if(errElem.id !== 'err-fb-user_mail' && errElem.id !== 'err-fb-user_mobile')
            if(errElem.innerHTML.length > 0) ok = false;
    })
    return ok;
}

mail.addEventListener('keyup', fieldKeyUpHandler);
if(mobile !== null)
    mobile.addEventListener('keyup', fieldKeyUpHandler);
form.addEventListener('submit', formSubmitHandler);
inputFields.forEach(elem => elem.addEventListener('blur', fieldsBlurHandler))