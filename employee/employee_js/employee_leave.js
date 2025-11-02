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
        successModal.classList.remove('show');
    };

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

        const newRow = historyTableBody.insertRow(); 

        const cellStartDate = newRow.insertCell(0);
        const cellEndDate = newRow.insertCell(1);
        const cellReason = newRow.insertCell(2);
        const cellStatus = newRow.insertCell(3);

        cellStartDate.textContent = dateFormatter.format(startDate);
        cellEndDate.textContent = dateFormatter.format(endDate);
        cellReason.textContent = reason;
        cellStatus.innerHTML = '<span class="status-tag status-pending">Menunggu</span>';

        leaveForm.reset();

        successModal.classList.add('show');
    });

    modalCloseBtn.addEventListener('click', closeModal);
    successModal.addEventListener('click', (event) => {
        if (event.target === successModal) {
            closeModal();
        }
    });
});