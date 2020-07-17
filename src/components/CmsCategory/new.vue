<template lang="html">
    <div class="task_create_wrap">
            <router-link :to="'/cms_category'" class="btn btn-outline-primary mt-2">Back
            </router-link>
            <hr />
            <h3>IndexTasks - new</h3>
            <hr class="mt-2 mb-2" />
            <div class="form-group">
                <label for="TopicTitle">Name : </label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" id="title"
                    v-model="name" required="required" />
                </div>
            </div>
            <hr />
            <button v-on:click="add_item();" class="btn btn-primary mt-2">Save
            </button>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
import LibCmsEdit_2 from '@/libs/LibCmsEdit_2';

var db = null
//
export default {
    mixins:[Mixin],
    created() {
        var config = LibCmsEdit_2.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE );  
console.log( config.DB_STORE )      
    },
    data() {
        return {
            name:'',
//            content:'',
        }
    },
    methods: {
        add_item(){
            var task = {
                name: this.name,
                //content: this.content,
                created_at: new Date(),
            }
            db.category.add( task)
            this.$router.push('/cms_category')            
        },
    }
}
</script>
