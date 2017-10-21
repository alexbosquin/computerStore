import Api from '@/services/Api'

export default {
    addComputer(info){
        return Api().post('computer/add',info)
    }
}