document.addEventListener('DOMContentLoaded', () => {
    const businessTripForm = document.querySelector('.card-form');
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

    if (businessTripForm) {
        businessTripForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const purpose = document.getElementById('perjalanan-aktivitas').value;
            const startDateValue = document.getElementById('perjalanan-mulai').value;
            const endDateValue = document.getElementById('perjalanan-selesai').value;

            if (!purpose || !startDateValue || !endDateValue) {
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
            newRow.insertCell(2).textContent = purpose;
            newRow.insertCell(3).innerHTML = '<span class="status-tag status-pending">Menunggu</span>';

            businessTripForm.reset();

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