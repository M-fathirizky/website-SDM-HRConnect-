document.addEventListener('DOMContentLoaded', () => {
    const businessTripTable = document.querySelector('.leave-table tbody');

    const confirmationModal = document.getElementById('confirmation-modal');
    const resultModal = document.getElementById('result-modal');

    const confirmYesBtn = document.getElementById('confirm-yes');
    const confirmNoBtn = document.getElementById('confirm-no');
    const resultOkBtn = document.getElementById('result-ok');

    const confirmationMessage = document.getElementById('confirmation-message');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');

    let targetRow = null;
    let action = null;

    const openConfirmationModal = (row, actionType) => {
        targetRow = row;
        action = actionType;
        const actionText = action === 'approve' ? 'menerima' : 'menolak';
        confirmationMessage.textContent = `Apakah Anda yakin ingin ${actionText} pengajuan perjalanan bisnis ini?`;
        confirmationModal.classList.add('show');
    };

    const closeConfirmationModal = () => {
        confirmationModal.classList.remove('show');
    };

    const openResultModal = (isSuccess) => {
        if (isSuccess) {
            resultIcon.className = 'fa-solid fa-circle-check';
            resultIcon.style.color = 'var(--success-green)';
            resultTitle.textContent = 'Berhasil!';
            resultMessage.textContent = `Pengajuan perjalanan bisnis telah di${action === 'approve' ? 'setujui' : 'tolak'}.`;
        } else {
            resultIcon.className = 'fa-solid fa-circle-xmark';
            resultIcon.style.color = 'var(--danger-red)';
            resultTitle.textContent = 'Gagal!';
            resultMessage.textContent = 'Terjadi kesalahan saat memproses permintaan.';
        }
        resultModal.classList.add('show');
    };

    const closeResultModal = () => {
        resultModal.classList.remove('show');
    };

    businessTripTable.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('btn-accept')) {
            openConfirmationModal(target.closest('tr'), 'approve');
        } else if (target.classList.contains('btn-reject')) {
            openConfirmationModal(target.closest('tr'), 'reject');
        }
    });

    confirmNoBtn.addEventListener('click', closeConfirmationModal);

    confirmYesBtn.addEventListener('click', () => {
        closeConfirmationModal();

        const actionCell = targetRow.querySelector('.action-buttons');
        if (action === 'approve') {
            actionCell.innerHTML = '<span class="status-tag status-approved">Disetujui</span>';
        } else {
            actionCell.innerHTML = '<span class="status-tag status-rejected">Ditolak</span>';
        }

        openResultModal(true);
    });

    resultOkBtn.addEventListener('click', closeResultModal);

    confirmationModal.addEventListener('click', (event) => {
        if (event.target === confirmationModal) {
            closeConfirmationModal();
        }
    });

    resultModal.addEventListener('click', (event) => {
        if (event.target === resultModal) {
            closeResultModal();
        }
    });
});