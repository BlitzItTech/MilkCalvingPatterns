<template>
    <div id="app">
        <div class="navbar navbar-light bg-light fixed-top">
            <h3>Milk Projections</h3>
        </div>
        <Home/>
    </div>
</template>

<script>
    import Home from './components/Home.vue';

    export default {
        name: 'app',
        components: {
            Home
        }
    };
</script>

<style>
</style>

