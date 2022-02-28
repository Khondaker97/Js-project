const btn = document.querySelector('.right .btn');
const modal = document.querySelector('.right .modal');
const close = document.querySelector('#close');
const sub = document.getElementById("subs");
const form = document.querySelector('form');

//Pop up
btn.addEventListener('click', () => {
    modal.style.display = 'flex';
});
//Close modal
close.addEventListener('click', closeModal);

function closeModal() {
    modal.classList.add('close');
    setTimeout(() => {
        modal.style.display = 'none';
        if (modal.style.display = 'none') {
            modal.classList.remove('close');
        }
    }, 1000);
};

modal.addEventListener('click', (e) => {
    const onlyModalClass = e.target.classList.contains('modal');
    if (onlyModalClass) {
        closeModal();
    }
});

//thanks
form.addEventListener('click', (e) => {
    e.preventDefault();
    const card = document.querySelector('.card');
    card.innerText = "Thanks for your subscription!";
    setTimeout(() => {
        closeModal();
    }, 3000);
});