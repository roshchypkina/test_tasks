describe('Autorization page', function() {

    var email = element(by.name('email'));
    var password = element(by.name('password'));
    var loginBtn = element(by.buttonText('Login'));
    var eyeBnt = element(by.css('[ng-click="showPassword = !showPassword"]'));
    var EC = protractor.ExpectedConditions;
    var userBtn = element(by.className('ssls-header-user'));
    var logOut = element(by.buttonText('Log out'));
    var viewProfile = element(by.linkText('Profile'));
    var passEditBtn = element(by.xpath('//form/div[3]/button'));
    var currentPass = element(by.name('current_password'));
    var newPass = element(by.name('password'));
    var saveBtn = element(by.xpath('//form/div[3]/div[2]/div/div[3]/button[2]'));



    function autorization(mail, pass) {
        element(by.buttonText('Log in')).click();
        expect(browser.getCurrentUrl()).toBe('https://www.sbzend.ssls.com/authorize');

        email.sendKeys(mail);
        password.sendKeys(pass);
        eyeBnt.click();
        expect(element(by.css('input[type=text]')).isPresent()).toBe(true);

        loginBtn.click();
    }

    function logout() {
        logOut.click();
        browser.wait(EC.presenceOf(loginBtn), 5000);
    }

    beforeEach(function() {
        browser.get('https://www.sbzend.ssls.com/');
    });

    it('Not registered user', function() {
        autorization('test@mail.com', 'password');
        browser.wait(EC.textToBePresentInElement($('.noty_text'), 'Uh oh! Email or password is incorrect'), 5000);
    });

    it('Registered user', function() {
        autorization('ssls.automation+666@gmail.com', '123456');
        expect(userBtn.getText()).toBe('SSLS.AUTOMATION+666@GMAIL.COM');
        userBtn.click();
        expect($('.ssls-dropdown__holder.ssls-dropdown__holder--toolbar').isPresent()).toBeTruthy();
        logout();
    });

    it('My Profile page. Client area', function() {
        autorization('ssls.automation+666@gmail.com', '123456');
        browser.get('https://www.sbzend.ssls.com/user/profile/');

        element(by.tagName('form')).getText().then(function(original_text) {
            passEditBtn.click();
            currentPass.sendKeys('123456');
            newPass.sendKeys('123456');
            saveBtn.click();
            userBtn.click();
            logout();

            autorization('ssls.automation+666@gmail.com', '123456');
            userBtn.click();
            viewProfile.click();

            expect(browser.getCurrentUrl()).toBe('https://www.sbzend.ssls.com/user/profile');

            element(by.tagName('form')).getText().then(function(new_text) {
                expect(original_text).toBe(new_text);
            });
        });

    });
});