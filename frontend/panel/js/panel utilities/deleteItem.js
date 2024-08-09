import {confirmDialog, popUp} from "../../../js/component/sweetAlertCustome.js";
import {fetchData} from "../../../js/utilities/fetchData.js";
import {url, $} from "../../../js/base.js";
import {getToken} from "../../../js/utilities/localStorageManager.js";

async function deleteItem(eve, Id, updateTable) {
    const isAgreeToDelete = await confirmDialog("آیا از حذف دوره مطمئن هستید؟", "حذف")

    if(isAgreeToDelete) {
        const route = eve.target.dataset.route

        try {
            const deleteResponse = await fetchData(url + `/${route}/${Id}`, "DELETE", {authorization: `Bearer ${getToken()}`})

            if(deleteResponse) {
                popUp("حذف با موفقیت انجام شد")
                await updateTable()
            }
            else {
                popUp("حذف انجام نشد", false)
            }
        }
        catch (e) {
            popUp("خطایی رخ داده است", false)
            throw new Error(e)
        }
    }
}

export {deleteItem}