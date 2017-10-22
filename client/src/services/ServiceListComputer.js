import Api from '@/services/Api'

export default {
    listComputers(){
        return Api().get('computer');
    }
}