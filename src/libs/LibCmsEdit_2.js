// LibCmsEdit_2

//import LibCommon from '@/libs/LibCommon';

//
export default {
    get_const: function(){
        return {
            DB_NAME: "cms_edit2_idx_kuc_db",
            DB_VERSION: 1,
            DB_STORE: {
//                cms_edit: '++id, category_id, title, content , created_at',
                cms_edit: '++id, category_id, show_id , title, content , created_at',
                category: '++id, name, created_at',
            },
            file_version: 2,
        }
    },
    get_show_item: function(items, id){
        var ret = null;
        items.forEach(function(item){
//console.log(item.show_id );
            if(item.show_id == String(id) ){
                ret = item
            }
        });
        return ret
    },    


}
