<template>
<div >
    <Head />
    <div class="container">
        <router-link :to="'/'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <h1>{{ title }}</h1>
        ID : {{ id }}<br />
        date : {{ create }}
        <hr />
        <div id="post_item" v-html="content"></div>
        <hr />
    </div>    
</div>
</template>

<script>
import {Mixin} from '../mixin'
import marked from  'marked'
import axios from 'axios'
import Head from '@/components/Layouts/Head'
import LibCommon from '@/libs/LibCommon';
import LibCmsEdit_2 from '@/libs/LibCmsEdit_2';

//
export default {
    components: { Head },    
    mixins:[Mixin],
    created () {
//        this.id = this.$route.params.id
//        this.get_item( this.id )
        var show_id = String(this.$route.params.id)
        this.get_item( show_id )
    },
    data () {
        var itemDat = {title : '', content : ''}
        return {
            id : 0,
            item: itemDat,
            tasks : [],
            title:'',
            content:'', 
            create : '',   
            cms_items: [],        
        }        
    },
    methods: {
        async get_item(id){
//console.log( id ) 
            var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
            axios.get('/cms.json?' + dt).then(res =>  {
                var data = res.data
                var items = LibCommon.convert_items(data.items )
                var item  = LibCmsEdit_2.get_show_item( items, String(id) )

                this.title = item.title
                this.content = marked(item.content)
                this.create = item.created_at
                this.id = item.id
//console.log( this.cms_items )
// console.log( item )
            })
        },
    }

}
</script>

<!-- -->
<style>
div#div_img_main2 {
    height: 300px;
    color: #FFF;
    margin: 0 0 0px;
    width: 100%;
    background:#ddd url(/img/ph2.jpg) no-repeat center center;
    background-size: cover;
    text-align: center;
}
</style>

