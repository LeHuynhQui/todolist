const getEle = (id) => document.getElementById(id)

export class Validation {
    kiemTraRong = (input, divShow, mess) => {
        if (input.trim()) {
            getEle(divShow).innerHTML = ''
            return true
        }
        getEle(divShow).innerHTML = mess
        return false
    };
    kiemTraTrung = (input, divShow, mess, list) => {
        let index = list.findIndex(task => task.taskName === input.trim())
        if (index !== -1) {
            getEle(divShow).innerHTML = mess
            return false
        }
        getEle(divShow).innerHTML = ''
        return true
    };

    kiemtraOnlyChu = (input, divShow, mess) => {
        let letter =
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

        if(input.match(letter)) {
            getEle(divShow).innerHTML = ''
            return true
        }
        getEle(divShow).innerHTML = mess
        return false

    }
}