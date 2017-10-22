import Api from '@/services/Api'

export default {
    listComputers(){
        return Api().get('computer');
    },
    listComputerByID(id)
    {
        return Api().get('computer/find/'+id);
    }
}