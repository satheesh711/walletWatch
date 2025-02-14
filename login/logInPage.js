let login = document.getElementById("signup_form")
let guestButton = document.getElementById("guest")

document.getElementById("Email_Mobile").onkeyup = ()=>error_check()
document.getElementById("password").onkeyup= ()=>error_check()

guestButton.addEventListener("click",()=>
{
    
    let personsdata=JSON.parse(localStorage.getItem("persons")) || []
    let expenses = JSON.parse(localStorage.getItem("expenses")) || []
    for(i=0;i<expenses.length;i++)
    {
        if(expenses[i].username == "Guest")
            expenses[i].expenses=[]
    }
    for(i=0;i<personsdata.length;i++)
    {
        if(personsdata[i].email == "Guest")
        {
            personsdata[i]={email: "Guest", username: "Guest", password: "Guest"}
            break
        }
    }
    if(i == personsdata.length)
        personsdata.push({email: "Guest", username: "Guest", password: "Guest"})
    let logInusername=JSON.parse(localStorage.getItem('LogedIn')) || []
    if(!logInusername.includes("Guest"))
    logInusername.push("Guest")
    localStorage.setItem("LogedIn",JSON.stringify(logInusername))
    localStorage.setItem("persons",JSON.stringify(personsdata));
    localStorage.setItem("expenses",JSON.stringify(expenses))
    sessionStorage.setItem("username","Guest");
    sessionStorage.setItem("defultsession","0")
    window.location.href="../home/homePage.html"
})

login.addEventListener('submit',(event)=>
{
    event.preventDefault()
    let mobile_email=document.getElementById('Email_Mobile').value
    let password = document.getElementById('password').value

    let personsdata=JSON.parse(localStorage.getItem("persons")) || []
    let persondata=personsdata.find(x=> x.email == mobile_email && x.password == password);
    let logInusername=JSON.parse(localStorage.getItem('LogedIn')) || []
    if(persondata)
    {
        if(logInusername.find(x=> x == persondata.username))
        {
            document.getElementById("credential_err").textContent="Sorry, This account is already loged in another device.please log out there"
        }else{
        logInusername.push(personsdata.find(x=>x.email==mobile_email).username)
        localStorage.setItem("LogedIn",JSON.stringify(logInusername))
        document.getElementById("credential_err").textContent=""
        document.getElementById('Email_Mobile').value=""
        sessionStorage.setItem("username",personsdata.find(x=>x.email==mobile_email).username);
        sessionStorage.setItem("defultsession","0")
        window.location.href="../home/homePage.html"
        }
    }
    else{
        document.getElementById("credential_err").textContent="Sorry, your Credentials was incorrect. Please double-check your Credentials."
    }
    
})
let btn= document.getElementById('show');
document.getElementById("password").addEventListener("keyup",()=>{
    if(document.getElementById("password").value.length == 0)
        {
            document.getElementById('show').style.display='none'
        }
        else{
            btn.style.display='block'
        }
       
})
btn.addEventListener('click',()=>
    {
        let inp=document.getElementById('password')
        if(inp.type === 'password')
        {
            inp.type ="text";
            btn.textContent='Hide'
        }
        else
        {
             inp.type='password'
             btn.textContent="Show"
        }
    })

function error_check()
{
    document.getElementById("credential_err").textContent=""
}