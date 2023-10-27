function from_login() {
    let username = document.getElementById('email').value;
    let password = document.getElementById
    ('password').value;


    console.log (email,password)
    if(email && password) {
        let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const exist = accounts.some(account => account.email === email);
        if (exist){
            alert(' Please enter your email');
            return;

        }
        accounts.push ({
            email: email,
            password: password,
        });

        localStorage.setItem('accounts', JSON.stringify(accounts))

            alert ('Login successfully'
            )
            window.location.href = "../user/user.html"
    }else{
            alert ('Please enter complete information')
        }
    }

