class LoginPage {
    contructor(page){
        this.page = page;
        this.input_email = page.getByTestId('input-email');
        this.input_password = page.getByTestId('input-password');
        this.btn_login = page.getByTestId('button-login')
    }

    async enterEmail(){}

    async enterPassword(){}

    async clickLogin(){}
}

export default LoginPage;