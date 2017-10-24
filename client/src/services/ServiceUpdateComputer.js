import Api from '@/services/Api'

export default {
    updateComputer(id,data){
        return Api().put('computer/update/'+id,data)
    }
}