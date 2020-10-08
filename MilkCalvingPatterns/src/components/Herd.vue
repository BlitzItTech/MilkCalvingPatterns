<template>
    <div>        
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Herd</label>
            <div class="col-sm-10 input-group">
                <input class="form-control" type="text" v-model="value.herdName" />
                <div class="input-group-append">
                    <button class="btn input-group-text" @click="removeHerd"><span class="oi oi-trash"/></button>
                    <button class="btn input-group-text" @click="changeColor"><span class="oi oi-pencil"/></button>
                </div>
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Cows</label>
            <div class="col-sm-10">
                <input class="form-control" type="number" v-model.number="value.herdSize" />
            </div>
        </div>

        <div class="form-group">
            <div class="row">
                <a class="btn btn-primary mx-3" data-toggle="collapse" data-target="#calvingPatterns">Calving Patterns</a>
                <a class="nav-link" @click="addPattern">Add</a>
            </div>
            
            <div class="collapse mt-3" id="calvingPatterns">
                <Calving-Pattern v-for="(pattern, index) in value.calvingPatterns" :key="index" :item="pattern" @remove="remove(index)"/>
                <hr />
            </div>
        </div>

        <hr />
    </div>
</template>

<script>
    export default {
        name: 'Herd',
        components: {
            CalvingPattern: () => import('./CalvingPattern.vue')
        },
        props: {
            value: Object
        },
        methods: {
            getNewColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color + '70';
            },
            changeColor() {
                this.value.color = this.getNewColor();
            },
            removeHerd() {
                this.$emit('removeHerd');
            },
            remove(index) {
                console.log('removing: ' + index);
                this.value.calvingPatterns.splice(index, 1);                
            },
            addPattern() {
                this.value.calvingPatterns.push(
                    {
                        patternName: 'Pattern' + this.value.calvingPatterns.length,
                        dateFrom: new Date('2/3/20'),
                        dateTo: new Date('3/2/20'),
                        staleAvg: 22,
                        peakAvg: 30,
                        freshAvg: 20,
                        weeksToPeak: 6,
                        weeksOfPeak: 20,
                        weeksTillStale: 20,
                        fertilityRate: 100,
                        herdRatio: 100,                                    
                        weeksDry: 8,
                        halfPercentDryWeek: 3,
                        useHalfPercent: false,
                    }
                )
            }
        }
    }
</script>

<style scoped>
</style>