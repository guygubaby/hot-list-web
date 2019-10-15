<template>
    <div class='home-wrapper'>
        <a-tabs :loading='isLoadingTypes' defaultActiveKey="1" @change="handleTabChange">
            <a-tab-pane v-for="item in typeList" :key="item.id" :tab="item.title"></a-tab-pane>
        </a-tabs>
        <section class='list-wrapper'>
            <a-list
                :loading="isLoadingList"
                itemLayout="horizontal"
                :dataSource="hotList">
                <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta
                    :description="item.desc"
                >
                    <a target="__blank" slot="title" :href="item.url">{{item.title}}</a>
                </a-list-item-meta>
                </a-list-item>
            </a-list>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            typeList:[],
            hotList:[],
            isLoadingList: true,
            isLoadingTypes: true,
        }
    },
    methods:{
        handleTabChange(e){
            this.getHotList(e)
        },
        async getHotList(cate){
            try{
                this.isLoadingList = true
                const res = await this.$api.list.get(cate)
                this.hotList = res.data
            }catch(e){
                this.$msg.warning('加载失败~')
            }finally{
                this.isLoadingList = false
                window.scroll({
                    left:0,
                    top:0,
                    behavior:'smooth'
                })
            }
        },
        async getTypes(){
            try{
                this.isLoadingTypes = true
                const res = await this.$api.types.get()
                this.typeList = res.data
                if(this.typeList.length>0){
                    const cate = this.typeList[0].id
                    cate&&this.getHotList(cate)
                }
            }catch(e){
                this.$msg.warning('加载失败~')
            }finally{
                this.isLoadingTypes = false
            }
        }
    },
    created() {
        this.getTypes()
    },
}
</script>
<style lang="scss">
.home-wrapper {
    margin-bottom: 3rem;
    .ant-tabs {
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: #fff;
    }
    .list-wrapper {
        display: flex;
        justify-content: center;
        .ant-list {
            width: 85vw;
        }
    }
    .ant-list-item-meta-title,.ant-list-item-meta-description {
        text-align: left;
    }
    .ant-list-item-meta-description {
        width:100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow:ellipsis;
    }
}
</style>