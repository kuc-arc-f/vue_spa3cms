<template>
<div class="body_main_wrap" style="background-color: #EEE">
    <Head />
    <div id="div_img_main2"  class="cover" style="" valign="bottom">
        <div id="div_img_layer">
            <h1>〇〇 Blog<br />
            </h1>
        </div>
    </div>     
    <!-- -->
    <div class="container">
        <div class="row conte" id="id_row_service" style="margin-top:10px;">
            <div class="col-sm-12" style="text-align:center;">
            <h2 class="h4_td_title mt-2">トピック</h2>
            <hr class="hr_ex1"/>
            </div>
        </div>
        <div class="row conte">
            <div class="col-sm-4">
            <img class="img_kao" src="/img/pc1.png" style="margin : 10px;">
            </div>
            <div class="col-sm-8">
            <h3>このサイトの紹介 1</h3>
            <p> <br>
            </p>
            </div>
        </div>
        <div class="row conte">
            <div class="col-sm-4">
            <img class="img_kao" src="/img/pc1.png" style="margin : 10px;">
            </div>
            <div class="col-sm-8">
            <h3>このサイトの紹介 2</h3>
            <p> <br>
            </p>
            </div>
        </div>         
        <!-- body_wrap -->
        <div class="body_wrap" style="padding-bottom: 20px;">
            <div id="post_items_box" class="row conte" style="margin-top: 10px; margin-bottom:20px;">
                <div class="col-sm-12">
                    <div id="div_news">
                        <h2 class="h4_td_title mt-2" >新着の投稿</h2>
                    </div>
                    <div class="post_items_wrap" v-for="item in cms_items" v-bind:key="item.id"
                        style="margin-bottom: 20px;">
                        <div class="div_news_rows" style="width:100%;">
                            <span  style="font-size: 28px; float :left; margin-right: 10px;">
                                <i class="fas fa-arrow-circle-right"></i>
                            </span>
                            &nbsp;&nbsp;
                            <h3 class="ml-10"> 
                                <router-link :to="'/show/' + item.show_id">{{ item.title }}
                                </router-link>
                            </h3>
                        </div>
                        <div style="width:100%;">
                            <ul class="ul_time_box">
                                <p class="mb-0">&nbsp;&nbsp;
                                    <span style="font-size: 20px; margin-right: 10px;">
                                        <i class="far fa-calendar"></i>
                                    </span>
                                    {{ item.created_at }} , ID: {{item.id}}
                                </p>
                            </ul>
                        </div>                
                        <hr class="hr_ex1"  />
                    </div>
                    <!-- paginate -->
                    <div v-if="pagenate_display==1" class="paginate_wrap" 
                        style="text-align: center;">
                        <button v-on:click="get_next_items()" class="btn btn-lg btn-outline-primary">
                            次ページを読む
                        </button>
                    </div>
                    <br />
                </div>
            </div>            

        </div>
    </div><!-- end_container -->

</div>
</template>

<script>
import {Mixin} from '../mixin'
import axios from 'axios'
// import $ from 'jquery'
import LibCommon from '@/libs/LibCommon';
import LibPaginate from '@/libs/LibPaginate';
import Head from '@/components/Layouts/Head'

// var db = null;
//
export default {
    components: { Head },    
    mixins:[Mixin],
    created () {
        this.page_items(1)
        var url = this.get_exStorage( this.sysConst.KEY_NEXT_ACTION )
        this.remove_exStorage(this.sysConst.KEY_NEXT_ACTION )
//console.log("url="+ url );
        if(url.length > 0){
            this.$router.push( url )
        }
    },
    data () {
        return {
            cms_items: [],
            items_all : [],
            pagenate_display : 0,
            page_one_max : 20, /* 1 page max */
            page_number : 1,
            page_max : 0,
        }
    },
    methods: {
        page_items (page ){
console.log( page )
            var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
            axios.get('/cms.json?' + dt).then(res =>  {
                var data = res.data
                var items = []
                if(data.file_version != null){
console.log( data.file_version )
                    items = LibCommon.get_reverse_items(data.items )
                    this.items_all = items;
                    //this.cms_items = items;
                }else{
                    alert("Error, file version can not import, version 2 over require")
                }
                this.page_max = LibPaginate.get_max_page(items, this.page_one_max)
                this.cms_items = LibPaginate.get_items(items, page , this.page_one_max )
//console.log( this.page_max )
//console.log( this.cms_items )
                if(this.page_max >=2 ){
                    this.pagenate_display = 1
                }
            })            
        },
        get_next_items: function(){
            this.page_number += 1
            var items  = LibPaginate.get_items(
                this.items_all, this.page_number , this.page_one_max 
            );
            this.cms_items = LibPaginate.add_page_items(this.cms_items, items );
//onsole.log( items )
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

