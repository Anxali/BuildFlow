class LoginPage {
    contructor(page){
        this.page = page;
        this.input_email = page.getByTestId('input-email');
        this.input_password = page.getByTestId('input-password');
        this.btn_login = page.getByTestId('button-login')
    }

    async enterEmail(email){
        this.input_email.fill(email);
    }

    async enterPassword(password){
        this.input_password.fill(password);
    }

    async clickLogin(){
        this.btn_login.click();
    }
}

export default LoginPage;