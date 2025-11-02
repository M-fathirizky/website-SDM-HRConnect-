$(function() { 
    const reimburseForm = $('.card-form');
    const reimburseTableBody = $('#reimburse-table-body');

    const successModal = $('#success-modal');
    const confirmationModal = $('#confirmation-modal');
    const resultModal = $('#result-modal');
    const modalCloseBtn = $('#modal-close-btn');
    const confirmYesBtn = $('#confirm-yes');
    const confirmNoBtn = $('#confirm-no');
    const resultOkBtn = $('#result-ok');
    const confirmationMessage = $('#confirmation-message');
    const resultIcon = $('#result-icon');
    const resultTitle = $('#result-title');
    const resultMessage = $('#result-message');

    let actionTarget = null;
    let currentAction = null; 

    const loggedInUser = {
        name: 'Naufal',
        role: 'finance',
        roleDisplay: 'Finance'
    };
    
    const showModal = (modal) => modal.addClass('show');
    
    const hideModal = (modal) => modal.removeClass('show');

    reimburseForm.on('submit', function(event) {
        event.preventDefault(); 

        const keterangan = $('#reimburse-kegiatan').val().trim();
        const tanggal = $('#reimburse-tanggal').val();
        const nominal = $('#reimburse-nominal').val();

        if (!keterangan || !tanggal || !nominal) {
            alert('Harap lengkapi semua field!');
            return;
        }

        const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const formattedNominal = `Rp ${parseInt(nominal).toLocaleString('id-ID')}`;

        const newRowHTML = `<tr>
            <td>${loggedInUser.name}</td>
            <td>${formattedDate}</td>
            <td>${keterangan}</td>
            <td>${formattedNominal}</td>
            <td class="action-buttons">
                <button class="btn-accept">Terima</button>
                <button class="btn-reject">Tolak</button>
            </td>
        </tr>`;

        reimburseTableBody.append(newRowHTML);

        reimburseForm[0].reset();
        showModal(successModal);
    });

    reimburseTableBody.on('click', '.btn-accept, .btn-reject', function(event) {
        const target = event.target;
        actionTarget = $(target).closest('tr');

        if ($(target).hasClass('btn-accept')) {
            currentAction = 'accept';
            confirmationMessage.text('Apakah Anda yakin ingin menyetujui pengajuan reimburse ini?');
        } else {
            currentAction = 'reject';
            confirmationMessage.text('Apakah Anda yakin ingin menolak pengajuan reimburse ini?');
        }
        showModal(confirmationModal);
    });

    modalCloseBtn.on('click', () => hideModal(successModal));

    confirmNoBtn.on('click', () => {
        hideModal(confirmationModal);
        actionTarget = null;
        currentAction = null;
    });

    confirmYesBtn.on('click', () => {
        hideModal(confirmationModal);

        if (actionTarget && currentAction) {
            const actionCell = actionTarget.find('.action-buttons');

            if (currentAction === 'accept') {
                resultIcon.attr('class', 'fa-solid fa-circle-check');
                resultTitle.text('Disetujui!');
                resultMessage.text('Pengajuan reimburse telah berhasil disetujui.');
                if (actionCell.length) {
                    actionCell.html(`<span class="status-tag status-approved">Disetujui</span>`);
                }
            } else {
                resultIcon.attr('class', 'fa-solid fa-circle-xmark');
                resultTitle.text('Ditolak!');
                resultMessage.text('Pengajuan reimburse telah ditolak.');
                if (actionCell.length) {
                    actionCell.html(`<span class="status-tag status-rejected">Ditolak</span>`);
                }
            }
            showModal(resultModal);
        }

        actionTarget = null;
        currentAction = null;
    });

    resultOkBtn.on('click', () => {
        hideModal(resultModal);
    });
});