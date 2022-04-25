<template>
    <div>
        <h1>Page with posts</h1>
        <MyInput
            v-model="searchQuery"
            placeholder="Search..."
            v-focus
        />
    <!--    <input type="text" v-model.number="modificatorValue"> -->
    <div class="app__btns">
        <Mybutton 
            @click="showDialog"
        >
        Create post
        </Mybutton>

        <MySelect
            v-model="selectedSort"
            :options="sortOptions"
        />
    </div>
        
        <MyDialog v-model:show="dialogVisible">
            <PostForm 
             @create="createPost"
        /> 
        </MyDialog>
        
        <PostList 
            v-bind:posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostLoading"
        />   
        <div v-else>Loading...</div> 
        <div v-intersection="loadMorePosts" class="observer"></div>  
      <!--  <div class="page__wrapper">
            <div 
            v-for="pageNumber in totalPages" 
            :key="pageNumber"
            class="page"
            :class="{
                'current_page': page === pageNumber
            }"
            @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div>  -->
    </div>
</template>
<script>
import PostForm from '@/component/PostForm.vue'
import PostList from '@/component/PostList.vue'
import axios from 'axios'
export default {
    components: {
        PostForm, PostList
    },
    data(){
        return {
            posts: [],
            dialogVisible: false,
            //modificatorValue: '',
            isPostLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'by name'},
                {value: 'body', name: 'by description'}
            ]
        }
    },
    methods: {
        createPost(post){
            this.posts.push(post)
            this.dialogVisible = false
        },
        removePost(post){
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog(){
            this.dialogVisible = true
        },
       // changePage(pageNumber){
       //     this.page = pageNumber      
       // },
        async fetchPosts() {
            try{
                this.isPostLoading = true
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data
                 
                 
            } catch (e) {
                alert('Error')
            } finally {
                this.isPostLoading = false
            }
        },
        async loadMorePosts() {
            try{
                this.page += 1
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data]
                 
            } catch (e) {
                alert('Error')
            }
        }
    },
    mounted(){
        this.fetchPosts()
        console.log(this.$refs.observer);
        },
    computed: {
        sortedPosts(){
            return [...this.posts].sort((post1, post2) =>  post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            )
            
        },
        sortedAndSearchedPosts(){
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
       // page(){
       //     this.fetchPosts()
       // }
    }
}
</script>

<style>

.app__btns{
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
.page__wrapper{
    display: flex;
    margin-top: 15px;

}
.page{
    border: 1px solid black;
    padding: 10px;
}
.current_page {
    border: 2px solid teal;
}
.observer{
    height: 30px;
    background: green;
}
</style>
