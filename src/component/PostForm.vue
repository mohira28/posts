<template>
    <form @submit.prevent>
            <h4>Создание поста</h4>
            <MyInput  
                v-focus
                v-model="post.title"
                type="text" 
                placeholder="Название"
            />
            <MyInput  
                v-model="post.body"
                type="text" 
                placeholder="Описание"
            />
            <mybutton 
                style="align-self: flex-end; margin-top: 15px;"
                @click="createPost"
            >Сreate
            </mybutton>
        </form>
</template>
<script>

export default {
  
    data(){
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPost(){
            this.post.id = Date.now()
            this.$emit('create', this.post)
            this.post = {
                title: '',
                body: ''
            }
        }
    }
}
</script>
<style scoped>
form{
    display: flex;
    flex-direction: column;
    width: 90%;
}
</style>