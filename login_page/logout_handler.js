$(function() {
    const logoutButton = $('.logout-button');
    const logoutModal = $('#logout-confirmation-modal');
    const confirmLogoutBtn = $('#confirm-logout');
    const cancelLogoutBtn = $('#cancel-logout');

    if (logoutButton.length && logoutModal.length) {
        logoutButton.on('click', function(event) {
            event.preventDefault();
            logoutModal.addClass('show');
        });

        cancelLogoutBtn.on('click', function() {
            logoutModal.removeClass('show');
        });

        confirmLogoutBtn.on('click', function() {
            window.location.href = '../../login_page/login.html';
        });

        logoutModal.on('click', function(event) {
            if ($(event.target).is(logoutModal)) {
                logoutModal.removeClass('show');
            }
        });
    }
});