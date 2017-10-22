import Api from '@/services/Api'

export default {
    deleteComputer(id){
        return Api().get('computer/delete/'+id);
    }
}