function register() {
    let email_address = document.getElementById("email_address").value;
    let password = document.getElementById("password").value;

    console.log (email_address,password)
    if(email_address && password) {
        let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const exist = accounts.some(account => account.email_address === email_address);
        if (exist){
            alert('Invalid email address or an account already exists.');
            return;

        }
        accounts.push ({
            email_address: email_address,
            password: password,
        });
        
        localStorage.setItem('accounts', JSON.stringify(accounts))

            alert (' You are registered successfully!!!')
            window.location.href = "../icon-header/from-login.html"
    }else{
            alert ('Please enter complete information, and make sure your email address is valid')
        }


}