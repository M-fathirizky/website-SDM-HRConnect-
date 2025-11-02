$(function() { 
    const users = [
        { username: 'fathir', password: 'fathir123', dashboardUrl: '../hrd/hrd_page/hrd_dashboard.html' },
        { username: 'haidar', password: 'haidar123', dashboardUrl: '../supervisor/supervisor_page/supervisor_dashboard.html' },
        { username: 'naufal', password: 'naufal123', dashboardUrl: '../finance/finance_page/finance_dashboard.html' },
        { username: 'fizryan', password: 'fizryan123', dashboardUrl: '../admin/admin_page/admin_dashboard.html' },
        { username: 'asep', password: 'asep123', dashboardUrl: '../employee/employee_page/employee_dashboard.html' }
    ];

    const loginForm = $('.login-form');
    const usernameInput = $('#username');
    const togglePassword = $('#togglePassword');
    const passwordInput = $('#password');
    const errorMessage = $('#login-error-message');

    if (loginForm.length) {
        loginForm.on('submit', function (event) {
            event.preventDefault(); 

            errorMessage.hide();

            const username = usernameInput.val().trim();
            const password = passwordInput.val().trim();

            const user = users.find(u => u.username === username);

            if (!user) {
                errorMessage.text('Akun tidak ditemukan').show();
                usernameInput.val('');
                passwordInput.val('');
            } else {
                if (user.password === password) {
                    window.location.href = user.dashboardUrl;
                } else {
                    errorMessage.text('Password yang Anda masukkan salah').show();
                    passwordInput.val('');
                }
            }
        });

        usernameInput.on('input', () => {
            errorMessage.hide();
        });

        passwordInput.on('input', () => {
            errorMessage.hide();
        });
    }

    if (togglePassword.length && passwordInput.length) {
        togglePassword.on('click', function () {
            const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
            passwordInput.attr('type', type);
            
            $(this).toggleClass('fa-eye fa-eye-slash');
        });
    }
});
