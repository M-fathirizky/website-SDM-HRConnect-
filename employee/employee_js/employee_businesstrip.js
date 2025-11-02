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
        successModal.classList.remove('show');
    };

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

        const newRow = historyTableBody.insertRow(); 

        const cellStartDate = newRow.insertCell(0);
        const cellEndDate = newRow.insertCell(1);
        const cellPurpose = newRow.insertCell(2);
        const cellStatus = newRow.insertCell(3);

        cellStartDate.textContent = dateFormatter.format(startDate);
        cellEndDate.textContent = dateFormatter.format(endDate);
        cellPurpose.textContent = purpose;
        cellStatus.innerHTML = '<span class="status-tag status-pending">Menunggu</span>';

        businessTripForm.reset();

        successModal.classList.add('show');
    });

    modalCloseBtn.addEventListener('click', closeModal);
    successModal.addEventListener('click', (event) => {
        if (event.target === successModal) {
            closeModal();
        }
    });
});