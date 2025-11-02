document.addEventListener('DOMContentLoaded', () => {
    const businessTripForm = document.querySelector('.card-form');
    const businessTripTableBody = document.getElementById('businesstrip-table-body');
    
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const confirmationModal = document.getElementById('confirmation-modal');
    const resultModal = document.getElementById('result-modal');
    const confirmYesBtn = document.getElementById('confirm-yes');
    const confirmNoBtn = document.getElementById('confirm-no');
    const resultOkBtn = document.getElementById('result-ok');
    const confirmationMessage = document.getElementById('confirmation-message');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    
    let actionTarget = null;
    let currentAction = null;
    
    const loggedInUser = {
        name: 'Fathir'
    };
    
    const showModal = (modal) => {
        if (modal) modal.classList.add('show');
    };

    const hideModal = (modal) => {
        if (modal) modal.classList.remove('show');
    };
    
    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    businessTripForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const aktivitas = document.getElementById('perjalanan-aktivitas').value.trim();
        const tanggalMulaiValue = document.getElementById('perjalanan-mulai').value;
        const tanggalSelesaiValue = document.getElementById('perjalanan-selesai').value;

        if (!aktivitas || !tanggalMulaiValue || !tanggalSelesaiValue) {
            alert('Harap lengkapi semua kolom formulir.');
            return;
        }

        const tanggalMulai = new Date(tanggalMulaiValue);
        const tanggalSelesai = new Date(tanggalSelesaiValue);

        const newRow = businessTripTableBody.insertRow();

        newRow.innerHTML = `
            <td>
                <div class="user-info">
                    <span class="user-name">${loggedInUser.name}</span>
                </div>
            </td>
            <td>${dateFormatter.format(tanggalMulai)}</td>
            <td>${dateFormatter.format(tanggalSelesai)}</td>
            <td>${aktivitas}</td>
            <td class="action-buttons">
                <button class="btn-accept">Terima</button>
                <button class="btn-reject">Tolak</button>
            </td>
        `;
        
        businessTripForm.reset();
        
        showModal(successModal);
    });
    
    businessTripTableBody.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('btn-accept')) {
            actionTarget = target.closest('tr');
            currentAction = 'accept';
            confirmationMessage.textContent = 'Apakah Anda yakin ingin menyetujui pengajuan ini?';
            showModal(confirmationModal);
        } else if (target.classList.contains('btn-reject')) {
            actionTarget = target.closest('tr');
            currentAction = 'reject';
            confirmationMessage.textContent = 'Apakah Anda yakin ingin menolak pengajuan ini?';
            showModal(confirmationModal);
        }
    });
    
    confirmNoBtn.addEventListener('click', () => {
        hideModal(confirmationModal);
        actionTarget = null;
        currentAction = null;
    });
    
    confirmYesBtn.addEventListener('click', () => {
        hideModal(confirmationModal);
        
        if (actionTarget && currentAction) {
            const actionCell = actionTarget.querySelector('.action-buttons');
            
            if (currentAction === 'accept') {
                resultIcon.className = 'fa-solid fa-circle-check';
                resultTitle.textContent = 'Disetujui!';
                resultMessage.textContent = 'Pengajuan perjalanan bisnis telah berhasil disetujui.';
                if (actionCell) {
                    actionCell.innerHTML = `<span class="status-tag status-approved">Disetujui</span>`;
                }
            } else { 
                resultIcon.className = 'fa-solid fa-circle-xmark';
                resultTitle.textContent = 'Ditolak!';
                resultMessage.textContent = 'Pengajuan perjalanan bisnis telah ditolak.';
                if (actionCell) {
                    actionCell.innerHTML = `<span class="status-tag status-rejected">Ditolak</span>`;
                }
            }
            showModal(resultModal);
        }
        
        actionTarget = null;
        currentAction = null;
    });
    
    resultOkBtn.addEventListener('click', () => {
        hideModal(resultModal);
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => hideModal(successModal));
    }
    if (successModal) {
        successModal.addEventListener('click', (event) => {
            if (event.target === successModal) {
                hideModal(successModal);
            }
        });
    }
});