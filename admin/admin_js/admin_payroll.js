document.addEventListener('DOMContentLoaded', () => {
    const reimburseForm = document.querySelector('.card-form');
    const historyTableBody = document.querySelector('.history-table tbody');

    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

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
        if (successModal) {
            successModal.classList.remove('show');
        }
    };

    if (reimburseForm) {
        reimburseForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const kegiatan = document.getElementById('reimburse-kegiatan').value;
            const tanggalValue = document.getElementById('reimburse-tanggal').value;
            const nominal = document.getElementById('reimburse-nominal').value;
            
            if (!kegiatan || !tanggalValue || !nominal) {
                alert('Harap lengkapi semua kolom formulir.');
                return;
            }

            if (nominal < 0) {
                alert('Nominal tidak boleh negatif.');
                return;
            }

            const newRow = historyTableBody.insertRow();

            newRow.insertCell(0).textContent = dateFormatter.format(new Date(tanggalValue));
            newRow.insertCell(1).textContent = kegiatan;
            newRow.insertCell(2).textContent = currencyFormatter.format(nominal).replace('IDR', 'Rp');
            newRow.insertCell(3).innerHTML = '<span class="status-tag status-pending">Menunggu</span>';

            reimburseForm.reset();

            if (successModal) {
                successModal.classList.add('show');
            }
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    if (successModal) {
        successModal.addEventListener('click', (event) => {
            if (event.target === successModal) {
                closeModal();
            }
        });
    }
});