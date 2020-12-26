let ver;


if (/*@cc_on!@*/0) {
    window.close();
}

function switchPage(name) {
    const loading = document.querySelector('#loading');
    loading.style.visibility = 'visible';
    document.querySelector('#content iframe').src = `${ver}/${name}.xml`;
    document.querySelector('title').innerHTML = `${name} at Pecis Docs`
}

function switchVer() {
    document.querySelector('title').innerHTML = `Pecis Docs`
    ver = document.querySelector('#select-ver').value;
    document.querySelector('#content iframe').removeAttribute('src');
    document.querySelectorAll('div.sidebar-content').forEach(each => each.style.display = 'none');
    Swal.closeModal();
    try {
        document.querySelector(`div.sidebar-${ver}`).style.display = 'block';
        Swal.fire({
            text: `Docs version changed to ${ver} successfully!`,
            position: 'top-left',
            showConfirmButton: false,
            toast: true,
            timer: 3000
        });
    } catch (e) {
        document.querySelector('#content iframe').src = 'display/ver-not-found.html'
        Swal.fire({
            title: 'Oops!',
            text: `We have not found the version ${ver}!`,
            position: 'top-left',
            showConfirmButton: false,
            toast: true,
            timer: 3000,
            showCancelButton: true
        });
    }
    document.querySelectorAll('.docs-list').forEach(each => each.childNodes.forEach((each) => {
        each.addEventListener('click', function () {
            switchPage(each.innerText);
        })
    }));
    return ver;
}
window.addEventListener('load', function () {
    const iframe = document.querySelector('#content iframe'),
        loading = document.querySelector('#loading'),
        select = document.querySelector('select#select-ver'),
        aside = document.querySelector('aside');
    select.addEventListener('change', switchVer);
    iframe.onload = function () {
        loading.style.visibility = 'hidden';
    }
    switchVer();
});

window.addEventListener('keydown', function (event) {
    /*
    if (event.key === 'k' && event.ctrlKey) {
        document.getElementById('search').focus();
        event.preventDefault();
    }
    */
})
