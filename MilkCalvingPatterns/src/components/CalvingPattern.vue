<template>
    <div>

        <div class="mx-1 input-group">
            <button class="btn btn-secondary form-control input-group-text" @click="toggleCollapse">{{ item.patternName }}</button>
            <button class="btn btn-danger" @click="remove"><span class="oi oi-trash" /></button>
        </div>
                
        <div :class="collapseClass" id="cp1">
            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Calving</label>
                <div class="col-sm-8">
                    <input class="form-control" type="text" v-model="item.patternName" />
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-4 col-form-label">From</label>
                <div class="col-sm-8">
                    <datepicker input-class="form-control" v-model="item.dateFrom" placeholder="select date" format="D dd-MMM yy" :disabled-dates="disabledDates"></datepicker>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-4 col-form-label">To</label>
                <div class="col-sm-8">
                    <datepicker input-class="form-control" v-model="item.dateTo" placeholder="select date" format="D dd-MMM yy" :disabled-dates="disabledDates"></datepicker>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Dry For</label>
                <div class="col-sm-8 input-group">
                    <input class="form-control" type="number" v-model.number="item.weeksDry" />
                    <div class="input-group-append">
                        <span class="input-group-text">Weeks</span>
                    </div>
                </div>
            </div>

            <div class="form-group align-middle">
                <input type="checkbox" v-model="item.useHalfPercent" />
                <label class="align-middle ml-3">Split Dry Ratio</label>
            </div>

            <div v-if="item.useHalfPercent" class="form-group row">
                <label class="col-sm-4 col-form-label">Half Herd Dry After</label>
                <div class="col-sm-8 input-group">
                    <input class="form-control" type="number" v-model.number="item.halfPercentDryWeek" />
                    <div class="input-group-append">
                        <span class="input-group-text">Weeks</span>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Fresh Avg</label>
                <div class="col-sm-8 input-group">
                    <input class="form-control" type="number" v-model.number="item.freshAvg" />
                    <div class="input-group-append">
                        <span class="input-group-text">Litres</span>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Peak Avg</label>
                <div class="col-sm-8 input-group">
                    <input class="form-control" type="number" v-model.number="item.peakAvg" />
                    <div class="input-group-append">
                        <span class="input-group-text">Litres</span>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Pre-Peak</label>
                <div class="col-sm-8 input-group">
                    <input class="form-control" type="number" v-model.number="item.weeksToPeak" />
                    <div class="input-group-append">
                        <span class="input-group-text">Weeks</span>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Peak For</label>
                <div class="col-sm-8 input-group">
                    <input class="form-control" type="number" v-model.number="item.weeksOfPeak" />
                    <div class="input-group-append">
                        <span class="input-group-text">Weeks</span>
                    </div>
                </div>
            </div>

            <div class="form-group row" title="How many weeks after peak ends does the cow reach stale?">
                <label class="col-sm-4 col-form-label">Stale After</label>
                <div class="col-sm-8 input-group">
                    <input class="form-control" type="number" v-model.number="item.weeksTillStale" />
                    <div class="input-group-append">
                        <span class="input-group-text">Weeks</span>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Stale Avg</label>
                <div class="col-sm-8 input-group">
                    <input class="form-control" type="number" v-model.number="item.staleAvg" />
                    <div class="input-group-append">
                        <span class="input-group-text">Litres</span>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-4 col-form-label">Herd Ratio</label>
                <div class="col-sm-8 input-group">
                    <input class="form-control" type="number" v-model.number="item.herdRatio" />
                    <div class="input-group-append">
                        <span class="input-group-text">%</span>
                    </div>
                </div>
            </div>

            <hr />
        </div>
        

    </div>
</template>

<script>
    export default {
        name: 'Calving-Pattern',
        components: {
            Datepicker: () => import('vuejs-datepicker'),
        },
        data: function () {
            return {
                disabledDates: {
                    days: [6, 0, 2, 3, 4, 5]
                },
                collapseClass: 'collapse',
            };
        },
        props: {
            item: Object,
        },
        methods: {
            remove() {
                this.$emit('remove');
            },
            toggleCollapse() {
                this.collapseClass = this.collapseClass != null ? null : 'collapse';
            }
        }
    }
</script>

<style scoped>
</style>