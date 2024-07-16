
export function popUp(text, status = true) {
    const title = status ? "موفق" : "خطا"
    const icon = status ? "success" : "error"

    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        position: "top-start",
        margin: "10rem",
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