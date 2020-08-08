const mail = document.querySelector('#user_mail');
const preloader = document.querySelector('#preloader');
const mailErrFb = document.querySelector('#mail-feedback');
const inputFields = document.querySelectorAll('.form-input')
const form = document.querySelector('form');
let timerID = 0;

const fieldKeyUpHandler = (e) => {
    const { target: elem } = e;
    if(elem.value){
        timerID = setTimeout(() => {
            preloader.classList.add('active');
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let isEmailValid = regex.test(elem.value);

            setTimeout(() => {
                isEmailValid ? mailErrFb.classList.add('ok') : mailErrFb.classList.remove('ok')

                mailErrFb.innerHTML = !isEmailValid 
                ? 'Debe ingresar un correo electrónico válido.'
                : 'Este correo electrónico es válido.';

                preloader.classList.remove('active')
            }, 1000);
        }, 800)
    }
}

const fieldsBlurHandler = (e) => {
    const { target: trgt } = e;
    const errElem = document.querySelector(`small[aria-labelledby="err[${trgt.id}]"]`)
    if(trgt.value.length < 1) errElem.innerHTML = 'Este campo es requerido.';
    if(errElem.id !== 'mail-feedback' && trgt.value.length > 0) errElem.innerHTML = '';
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
        if(elem.id === "user_mail" && errElem.innerHTML.length > 0) ok = false;
    })
    return ok;
}

mail.addEventListener('keyup', fieldKeyUpHandler);
form.addEventListener('submit', formSubmitHandler);
inputFields.forEach(elem => elem.addEventListener('blur', fieldsBlurHandler))