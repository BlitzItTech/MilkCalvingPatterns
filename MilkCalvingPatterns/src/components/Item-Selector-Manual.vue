<template>
    <div>
        <label v-if="title != null">{{ title }}</label>
        <select class="custom-select" ref="selPicker" :value="value" @change="change">
            <option v-for="(item, index) in items" :key="index" :value="item">
                <slot v-bind:item="item">
                    <span v-if="displayProperty != null">{{ item[displayProperty] }}</span>
                    <span v-else>{{ item }}</span>
                </slot>
            </option>
        </select>
    </div>
</template>

<script>

    export default {
        name: 'Item-Selector-Manual',
        props: {
            items: Array,
            title: String,
            value: null,
            displayProperty: {
                type: String,
                default: null
            },
            //filter: {
            //    type: Function,
            //    default: (list) => {
            //        return list;
            //    }
            //}
        },
        computed: {
            //itemsToShow() {
            //    return this.filter(items);
            //}
        },
        methods: {
            change: function () {
                this.$emit('input', this.$refs.selPicker.value);
                this.$emit('change', this.$refs.selPicker.value);
            }
        }
    }
</script>

<style scoped>
</style>