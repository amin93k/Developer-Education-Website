function popUp(text, status = true) {
    const title = status ? "موفق" : "خطا"
    const icon = status ? "success" : "error"

    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        position: "top-start",
        width: "30rem",
        timer: 4000,
        toast: true,
        showConfirmButton: false,
        showClass: {
            popup: `
                  animate__animated
                  animate__fadeInDown
                  animate__faster`,
            backdrop: 'swal2-backdrop-hide',
        },
        hideClass: {
            popup: 'swal2-hide',
            backdrop: 'swal2-backdrop-hide',
            icon: 'swal2-icon-hide'
        }
    })
}

async function confirmDialog(title, confirmButtonText) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-danger ms-3",
            cancelButton: "btn btn-primary"
        },
        buttonsStyling: false
    });
    const result = await swalWithBootstrapButtons.fire({
        title: title,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: "انصراف",
        reverseButtons: true
    })

    return result.isConfirmed
}


export {popUp, confirmDialog}