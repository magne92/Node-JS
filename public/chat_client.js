var messages_loaded = 0

function add_message(){
    const msg = document.getElementById('message').value

    fetch('/add_msg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: msg })
        
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            //load_messages();
            document.getElementById('message').value = '';
        } else {
            alert(data.message);
        }
    });

}

function load_messages() {
    var messages_loaded = document.getElementById('chat_field').childElementCount

    fetch('/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({messages_loaded: messages_loaded})
    })
    .then(res => res.json())
    .then(data => {
        console.log(messages_loaded, data.length)
        const chat = document.getElementById('chat_field');
        if (data.length > messages_loaded){

            chat.innerHTML = ''
            data.forEach((msg, index) => {
                const p = document.createElement('p')
                p.textContent = msg;
                p.classList.add("bg-secondary", "p-3", "me-3", "w-90", "rounded", "text-wrap")
                chat.appendChild(p)
                chat.scrollTop = chat.scrollHeight // sets scroll to bottom
                //messages_loaded += 1;
            });
            console.log("msg loaded: ", messages_loaded);
        } else if (data.length == 0 ) {
            chat.innerHTML = ''
        } 
        else {
            //chat.innerHTML = ''
            console.log("no new messages")
 
        }
        });
}

setInterval(load_messages, 500)