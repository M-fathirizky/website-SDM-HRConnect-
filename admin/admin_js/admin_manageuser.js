$(document).ready(function() {
    $('#add-user-form').on('submit', function(event) {
        event.preventDefault();

        const userName = $('#user-name').val();
        const userRole = $('#user-role').val();

        if (!userName || userName.trim() === '' || !userRole) {
            alert('Nama dan Role tidak boleh kosong!');
            return;
        }

        const roleText = userRole.charAt(0).toUpperCase() + userRole.slice(1);

        const newRow = `
            <tr>
                <td>${userName}</td>
                <td><span class="role-tag ${userRole}">${roleText}</span></td>
                <td><span class="status-tag active">Aktif</span></td>
            </tr>
        `;

        $('#user-management-table tbody').append(newRow);

        $('#user-name').val('');
        $('#user-role').val('');
    });
});