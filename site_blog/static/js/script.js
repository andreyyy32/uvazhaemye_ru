document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', formSend);
    }
    async function formSend(e) {
        const timeout = 100;
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage[0]);
        formData.append('article', formArticle[0]);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreviewImage.innerHTML = '';
                formPreviewNameImage.innerHTML = '';
                formPreviewArticle.innerHTML = '';
                formPreviewNameArticle.innerHTML = '';
                form.reset();
                form.classList.remove('_sending')
            } else {
                alert('Fail')
                form.classList.remove('_sending')
            }
        } else {
            setTimeout(function () {
                const popupActiveError = document.querySelector('.popup__error');
                popupOpen(popupActiveError);
            }, timeout)
        }
    }

    function formValidate() {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++
                }
            }

            if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                formAddError(input);
                error++
            }

            if (input.value === '') {
                formAddError(input);
                error++
            }
        }
        return error
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    const  formImage  = document.getElementById('formImage');
    const  formPreviewNameImage  = document.getElementById('formPreviewNameImage');
    const  formPreviewImage  = document.getElementById('formPreviewImage');

    if(formImage){
        formImage.addEventListener('change', () => {
            const files = formImage.files;

            for (let i = 0; i < files.length; i++)
                uploadFileImage(formImage.files[i]);
        });
    }

    function uploadFileImage(file) {
        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/JPG'].includes(file.type)){
            const popupActiveError = document.querySelector('.popup__error');
            popupOpen(popupActiveError);
            formImage.value = '';
            return;
        }
        if (file.size > 20 * 1024 * 1024){
            alert('Размер файла должен быть не более 20mb');
            formImage.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            formPreviewImage.innerHTML = `<img src="${e.target.result}" alt="Photo">`;
            formPreviewNameImage.innerHTML = formImage.files[0].name;
        };

        reader.onerror = function() {
            alert('Ошибка загрузки, пожалуйста повторите');
        };
        reader.readAsDataURL(file);
    }

    const  formArticle  = document.getElementById('formArticle');
    const  formPreviewNameArticle  = document.getElementById('formPreviewNameArticle');
    const  formPreviewArticle  = document.getElementById('formPreviewArticle');

    if (formArticle) {
        formArticle.addEventListener('change', () => {
            const files = formArticle.files;

            for (let i = 0; i < files.length; i++)
                uploadFileArticle(formArticle.files[i]);
        });
    }

    function uploadFileArticle(file) {
        if (!['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'].includes(file.type)){
            const popupActiveError = document.querySelector('.popup__error');
            popupOpen(popupActiveError);
            formArticle.value = '';
            return;
        }
        if (file.size > 20 * 1024 * 1024){
            alert('Размер файла должен быть не более 20mb');
            formImage.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function() {
            if (['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
                formPreviewArticle.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Microsoft_Word_logo_%282013-2019%29.png" height="75px" width="auto" alt="MSWord">`;
            }
            else{
                formPreviewArticle.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" height="75px" width="auto" alt="PDF">`;
            }
            formPreviewNameArticle.innerHTML = formArticle.files[0].name;
        };

        reader.onerror = function() {
            alert('Ошибка загрузки, пожалуйста повторите');
        };
        reader.readAsDataURL(file);
    }
});

// function showType(fileInput) {
//     const files = fileInput.files;
//
//     for (let i = 0; i < files.length; i++) {
//         const name = files[i].name;
//         const type = files[i].type;
//         alert("Filename: " + name + " , Type: " + type);
//     }
// }

// Popup

// const popupLinks = document.querySelectorAll('.popup-link');
// const body = document.querySelector('body');
// const lockPadding = document.querySelector('.lock-padding');
//
// let unlock = true;
//
// const timeout = 800;
//
// if (popupLinks.length > 0) {
//     for (let index = 0; index < popupLinks.length; index++) {
//         const popupLink = popupLinks[index];
//         popupLink.addEventListener('click', function (e) {
//             const popupName = popupLink.getAttribute('href').replace('#', '');
//             const currentPopup = document.getElementById(popupName);
//             popupOpen(currentPopup);
//             e.preventDefault();
//         });
//     }
// }
//
// const popupCloseIcon = document.querySelectorAll('.close-popup');
// if (popupCloseIcon.length > 0) {
//     for (let index = 0; index < popupCloseIcon.length; index++) {
//         const el = popupCloseIcon[index];
//         el.addEventListener('click', function (e) {
//             popupClose(el.closest('.popup__error'));
//             e.preventDefault()
//         })
//     }
// }
//
// function popupOpen(currentPopup) {
//     if (currentPopup && unlock) {
//         const popupActive = document.querySelector('.popup__error.open');
//         if (popupActive) {
//             popupClose(popupActive, false)
//         } else {
//             bodyLock();
//         }
//         currentPopup.classList.add('open');
//         currentPopup.addEventListener('', function (e) {
//             if (!e.target.closest('.popup__error_content')) {
//                 popupClose(e.target.closest('.popup__error'));
//             }
//         });
//     }
// }
//
// function popupClose(popupActive, doUnlock = true) {
//     if (unlock) {
//         popupActive.classList.remove('open');
//         if (doUnlock) {
//             bodyUnlock();
//         }
//     }
// }
//
// function bodyLock() {
//     const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth - 'px';
//
//     if (lockPadding.length > 0) {
//         for (let index = 0; index < lockPadding.length; index++) {
//             const el = lockPadding[index];
//             el.style.paddingRight = lockPaddingValue;
//         }
//     }
//     body.style.paddingRight = lockPaddingValue;
//     // body.classList.add('lock');
//
//     unlock = false;
//     setTimeout(function () {
//         unlock = true
//     }, timeout);
// }
//
// function bodyUnlock() {
//     setTimeout(function () {
//         if (lockPadding > 0) {
//             for (let index = 0; index < lockPadding.length; index++) {
//                 const el = lockPadding[index];
//                 el.style.paddingRight = '0px'
//             }
//         }
//         body.style.paddingRight = '0px';
//         // body.classList.remove('lock')
//     }, timeout);
//
//     unlock = false;
//     setTimeout(function () {
//         unlock = true
//     }, timeout)
// }
//
//
// document.addEventListener('keydown', function(e){
//     if(e.key === 'Escape'){
//         const popupActive = document.querySelector('.popup__error.open');
//         popupClose(popupActive)
//     }
// });

// PopupWrongFileType

