<template>
    <div class="task_index_wrap">
        <navbar />
        <FlashMessage></FlashMessage>
        <div class="row" style="margin-top: 10px;">
            <div class="col-sm-4"><h3>CmsCategory</h3>
            </div>
            <div class="col-sm-4">
                <router-link :to="'/cms_category/new/'" class="btn btn-primary">Create
                </router-link>
            </div>
            <div class="col-sm-4" style="text-align: right;">
                &nbsp;&nbsp;
            </div>
        </div>
        <hr class="mt-2 mb-2" />
        <br />
        <ul v-for="item in category_items" v-bind:key="item.id">
            <li>
                <router-link :to="'/dexie_tasks/show/' + item.id">{{ item.name }}</router-link>
                &nbsp;&nbsp;
                <router-link :to="'/dexie_tasks/edit/' + item.id"
                 class="btn btn-outline-primary btn-sm">Edit
                </router-link>                
                <br />
                ID : {{ item.id }}
                , {{ item.created_at }}
            </li>
        </ul>
        <hr />
        <div class="page_info_wrap">
            <ul>
                <li>このページの機能は、オープンソースで公開しております。<br />
                    <a  href='https://github.com/kuc-arc-f/vue_spa3b_1crud'>
                        https://github.com/kuc-arc-f/vue_spa3b_1crud 
                    </a><br />
                    <br />
                </li>
                <li>関連ブログ:<br />
                    <a  href='https://knaka0209.hatenablog.com/entry/indexed_db_1'>
                        https://knaka0209.hatenablog.com/entry/indexed_db_1
                    </a><br />
                </li>
            </ul>
        </div>        
    </div>
</template>

<!-- -->
<style> 
.page_info_wrap{
    background: #EEE;
    padding : 10px;
    margin-top : 20px;
}
</style>
<!-- -->
<script>
import {Mixin} from '../../mixin'
import FlashMessage from '../../components/Layouts/FlashMessage'
import navbar from '@/components/Layouts/Navbar'
import Dexie from 'dexie';
import LibDexie from '@/libs/LibDexie';
import LibCmsEdit_2 from '@/libs/LibCmsEdit_2';

var db = null;
//
export default {
    mixins:[Mixin],
    components: { FlashMessage ,navbar },
    created () {
        var config = LibCmsEdit_2.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE );        
        this.get_items()
    },
    data () {
        return {
//            tasks: [],
            category_items : [],
//            items_org: [],
        }
    },
    methods: {
        get_items(){
            var self = this
            db.category.toArray().then(function (items ) {
                self.category_items = LibDexie.get_reverse_items(items)
                console.log( items )
            });
        },
    }
}
</script>
