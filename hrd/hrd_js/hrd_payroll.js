$(function() { 
    const gajiForm = $('#gaji-form');
    const gajiTableBody = $('#gaji-table-body');

    const successModal = $('#success-modal');
    const modalCloseBtn = $('#modal-close-btn');

    const showModal = (modal) => {
        if (modal) modal.addClass('show');
    };
    const hideModal = (modal) => {
        if (modal) modal.removeClass('show');
    };

    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const currencyFormatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    gajiForm.on('submit', function(event) {
        event.preventDefault();

        const nama = $('#gaji-nama').val().trim();
        const roleDivisi = $('#gaji-role-divisi').val().trim();
        const tanggalValue = $('#gaji-tanggal').val();
        const nominal = $('#gaji-nominal').val();

        if (!nama || !roleDivisi || !tanggalValue || !nominal) {
            alert('Harap lengkapi semua kolom formulir.');
            return;
        }

        const formattedTanggal = dateFormatter.format(new Date(tanggalValue));
        const formattedNominal = currencyFormatter.format(nominal).replace('IDR', 'Rp');

        const newRowHTML = `
            <tr>
                <td>${nama}</td>
                <td>${roleDivisi}</td>
                <td>${formattedTanggal}</td>
                <td>${formattedNominal}</td>
                <td><span class="status-tag status-paid">Tersimpan</span></td>
            </tr>
        `;

        gajiTableBody.append(newRowHTML);

        gajiForm[0].reset(); 

        showModal(successModal);
    });

    modalCloseBtn.on('click', () => hideModal(successModal));
    successModal.on('click', function(event) {
        if (event.target === this) {
            hideModal(successModal);
        }
    });
});
