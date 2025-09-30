document.addEventListener('DOMContentLoaded', async function () {
    // Initialization Quill
    let quill = new Quill('#editor', {
        theme: 'snow'
    });


    // have content does click in the button 
    document.getElementById('get-content').addEventListener('click', function () {
        let content = quill.root.innerHTML;
        document.getElementById('output').innerHTML = content;
    });

    let elements = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elements)

    // await fetch('/api/user')
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data) {
    //             if (data.error) {
    //                 M.toast({ html: '<div class="toast-p">Ups!, ' + data.error + '</div>' })
    //                 M.toast({ html: '<div class="toast-p">Redireccionando!</div>' })
    //                 let meta = document.createElement('meta');
    //                 meta.setAttribute('http-equiv', 'refresh');
    //                 meta.setAttribute('content', '6;url=/');
    //                 document.getElementsByTagName('head')[0].appendChild(meta);
    //                 let progress = document.createElement('div')
    //                 progress.innerHTML = `
    //              <div class="progress">
    //                 <div class="indeterminate"></div>
    //              </div>
    //            `;
    //                 document.getElementById('progress').appendChild(progress)

    //             }
    //             if (data.name) {
    //                 M.toast({ html: '<div class="toast-s">Bienvenido, ' + data.name + '</div>' })
    //             }
    //         }
    //         else {
    //             console.error('Ups! Not have data');

    //         }
    //     })
    //     .catch(error => console.error('Error getting data'));
})
