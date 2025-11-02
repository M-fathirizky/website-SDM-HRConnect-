document.addEventListener('DOMContentLoaded', () => {
    const leaveForm = document.querySelector('.card-form');
    const historyTableBody = document.querySelector('.history-table tbody');

    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const closeModal = () => {
        if (successModal) {
            successModal.classList.remove('show');
        }
    };

    if (leaveForm) {
        leaveForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const reason = document.getElementById('cuti-alasan').value;
            const startDateValue = document.getElementById('cuti-mulai').value;
            const endDateValue = document.getElementById('cuti-selesai').value;

            if (!reason || !startDateValue || !endDateValue) {
                alert('Harap lengkapi semua kolom formulir.');
                return;
            }

            const startDate = new Date(startDateValue);
            const endDate = new Date(endDateValue);

            if (startDate > endDate) {
                alert('Tanggal mulai tidak boleh lebih besar dari tanggal selesai.');
                return;
            }

            const newRow = historyTableBody.insertRow(); 

            newRow.insertCell(0).textContent = dateFormatter.format(startDate);
            newRow.insertCell(1).textContent = dateFormatter.format(endDate);
            newRow.insertCell(2).textContent = reason;
            newRow.insertCell(3).innerHTML = '<span class="status-tag status-pending">Menunggu</span>';

            leaveForm.reset();

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