$(function() { 
    const reimburseForm = $('.card-form');
    const historyTableBody = $('.history-table tbody');

    const successModal = $('#success-modal');
    const modalCloseBtn = $('#modal-close-btn');

    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const currencyFormatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    const closeModal = () => {
        successModal.removeClass('show');
    };

    reimburseForm.on('submit', function (event) {
        event.preventDefault();

        const kegiatan = $('#reimburse-kegiatan').val();
        const tanggalValue = $('#reimburse-tanggal').val();
        const nominal = $('#reimburse-nominal').val();

        if (!kegiatan || !tanggalValue || !nominal) {
            alert('Harap lengkapi semua kolom formulir.');
            return;
        }

        const tanggal = new Date(tanggalValue);
        const formattedTanggal = dateFormatter.format(tanggal);
        const formattedNominal = currencyFormatter.format(nominal).replace('IDR', 'Rp');

        const newRow = `
            <tr>
                <td>${formattedTanggal}</td>
                <td>${kegiatan}</td>
                <td>${formattedNominal}</td>
                <td><span class="status-tag status-pending">Menunggu</span></td>
            </tr>
        `;

        historyTableBody.append(newRow);

        reimburseForm[0].reset(); 

        successModal.addClass('show');
    });

    modalCloseBtn.on('click', closeModal);
    successModal.on('click', function(event) {
        if (event.target === this) {
            closeModal();
        }
    });
});