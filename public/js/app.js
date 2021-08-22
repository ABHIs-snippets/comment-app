let userName = null;

let socket = io()

do {
    userName = prompt('Enter your name')
} while (!userName);

const textarea = document.getElementById('textarea');

const submitBtn = document.getElementById('submit');

const commentBox = document.querySelector('.comment__box');

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let comment = textarea.value

    if(!comment){
        return
    }
    postComment(comment);
})

function broadcastComment(data){
socket.emit('comment',data);
}

function postComment(comment){
    let data = {comment:comment,userName:userName}
    appendComment(data)
    textarea.value = ''
    broadcastComment(data);
}

function appendComment(data){
    let liElem = document.createElement('li');
    liElem.classList.add('comment')

    let innerHtml = `
     <div class="card border-light mb-3">
    <div class="card-body">
        <h6>${data.userName}</h6>
        <p>${data.comment}</p>
        <div>
            <small>
                <time>${data.time || Date()}</time>
            </small>
        </div>
    </div>
</div>`

liElem.innerHTML = innerHtml
commentBox.prepend(liElem)
}

socket.on('comment',data=>{
    this.appendComment(data)
})

//typing

textarea.addEventListener('keyup',(e)=>{
    socket.emit('typing',{userName})
})

socket.on('typing',data=>{
    let typeDiv = document.querySelector('.typing');
    typeDiv.innerText = `${data.userName} is typing...`;
    deBounce(()=>{typeDiv.innerText = ''},1000)

})

let timeId = null;
function deBounce(func,time){
    if(timeId) clearTimeout(timeId)
   timeId = setTimeout(func,time)
}