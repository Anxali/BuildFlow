class LoginPage {
    constructor(page){
        this.page = page;
        this.input_email = page.getByTestId('input-email');
        this.input_password = page.getByTestId('input-password');
        this.btn_login = page.getByTestId('button-login')
    }

    async enterEmail(email){
        await this.input_email.fill(email);
        console.log("entered email")
    }

    async enterPassword(password){
        await this.input_password.fill(password);
        console.log("entered password")
    }

    async clickLogin(){
        await this.btn_login.click();
        console.log("clicked login button")
    }
}

export default LoginPage;