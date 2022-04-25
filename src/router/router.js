import Main from '@/pages/Main'
import About from '@/pages/About'
import PostPage from '@/pages/PostPage'
import PostId from '@/pages/PostId'
import PostPageWithStore from '@/pages/PostPageWithStore'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostId
    },
    {
        path: '/store',
        component: PostPageWithStore
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router