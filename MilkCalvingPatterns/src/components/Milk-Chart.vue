<script>
    import { Line } from 'vue-chartjs';

    export default {
        extends: Line,  
        name: 'Milk-Chart',        
        data: function () {
            return {
                //labelList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
            }
        },
        props: {                        
            data: Object,
            options: Object,
        },
        watch: {
            data() {
                //this.data._chart.update();
                this.renderChart(this.data, this.options);
            },
            options() {
                this.renderChart(this.data, this.options);
            }
        },
        mounted() {
            console.log('mounting');
            this.renderChart(this.data, this.options);
        }
    }
</script>

<style scoped>
</style>