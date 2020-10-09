<template>    
    <div class="mx-4">
        <div class="below-nav row">
            <div class="col-sm-6 col-md-5 col-lg-4 col-xl-3 bg-light full-screen">
                <div class="row align-middle">
                    <button class="btn btn-primary mx-1" @click="newHerd"><span class="oi oi-plus mr-1" />Herd</button>
                    <!--<button class="btn btn-primary mx-1">Load</button>-->
                    <download-csv class="btn btn-primary" :data="jsonData" name="herddata.csv">
                        <span class="oi oi-data-transfer-download"/>                        
                    </download-csv>
                    <button class="btn btn-primary mx-1" @click="refresh"><span class="oi oi-reload" /></button>
                </div>                

                <hr />

                <div>
                    <label class="col-sm-4 col-form-label">Start On</label>
                    <div class="col-sm-8">
                        <datepicker :inline="true" input-class="form-control" v-model="dayOne" placeholder="select date" format="D dd-MMM yy" :disabled-dates="disabledDates"></datepicker>
                    </div>
                </div>

                <div class="form-group form-check">
                    <input id="ch1" class="form-check-input" type="checkbox" v-model="showTwoYears" @change="refresh" />
                    <label for="ch1" class="form-check-label">Show Two Years</label>
                </div>

                <div>
                    <Item-Selector-Manual title="Line Property" @change="refreshYearlyHerdData" v-model="propToShow" :items="['Litres', 'Average', 'Cows In Milk']"/>
                </div>

                <hr />
                <Herd v-for="(herd, index) in herds" :key="index" v-model="herd.herd" @removeHerd="removeHerd(index)">
                </Herd>
            </div>
            <div class="col-sm-6 col-md-7 col-lg-8 col-xl-9 offset-sm-6 offset-md-5 offset-lg-4 offset-xl-3 fixed-top">                
                <Milk-Chart v-if="showGraph" :data="chartData" :options="chartOptions"/>
                <!--<div v-for="(herd, index) in chartHerdsData" :key="index" class="flex-col">
                    HERD: {{ herd.herdName }}
                    <div v-for="(data, index) in herd.weekData" :key="index">
                        Date: {{ data.dateOn | toShortDate }} Herd: {{ data.miniHerdNumber }} Cows: {{ data.cows }} Litres: {{ Math.round(data.litres) }}  Status: {{ data.status }}
                    </div>
                </div>-->                
            </div>            
        </div>
    </div>    
</template>

<script>
    import moment from 'moment';
    import JsonCSV from 'vue-json-csv';

    export default {
        name: 'Home',     
        components: {
            Herd: () => import('./Herd.vue'),
            MilkChart: () => import('./Milk-Chart.vue'),     
            Datepicker: () => import('vuejs-datepicker'),
            ItemSelectorManual: () => import('./Item-Selector-Manual.vue'),
            DownloadCsv: () => import('vue-json-csv'),
        },
        data: function () {
            return {
                propToShow: 'Litres,=',
                //herd: { calvingPatters: Array, herdName: String}
                herds: [
                    {
                        herd: {
                            herdName: 'Herd One',
                            herdSize: 100,
                            calvingPatterns: [
                                {
                                    patternName: 'Summer Calvers',
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
                            ],
                            color: this.getNewColor(),
                        }
                    }                    
                ],
                iterations: 1,
                dayOne: new Date('2/3/20'),
                isGraphOverlay: true,
                isIndividualPatterns: false,
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
                chartData: {
                    labels: [],
                    datasets: []
                        //{
                        //    //label, backgroundColor, data: []
                        //    label: 'Data One',
                        //    backgroundColor: '#f87979',
                        //    data: [40, 20],
                        //}
                    //]
                },
                chartHerdsData: [],
                herdsData: null,
                showProp: 'Litres',
                showGraph: true,    
                disabledDates: {
                    days: [6, 0, 2, 3, 4, 5],
                    to: new Date('1/6/2020'),
                    from: new Date('1/4/2021')
                },
                jsonData: null,
                showTwoYears: false,
            }            
        },
        created() {
            var e = this.$cookie.get('milk-graphs');
            //console.log(e);
            if (e != null) {
                this.loadData(e);                
                this.refresh();
            }
        },
        methods: {
            loadData(herdJSONString) {
                var herds = JSON.parse(herdJSONString);

                for (var i = 0; i < herds.length; i++) {
                    var herd = herds[i].herd;
                    for (var ii = 0; ii < herd.calvingPatterns.length; ii++) {
                        var pattern = herd.calvingPatterns[ii];

                        pattern.dateFrom = new Date(pattern.dateFrom);
                        pattern.dateTo = new Date(pattern.dateTo);
                    }
                }

                this.herds = herds;
            },
            newHerd() {
                this.herds.push({
                    herd: {
                        herdName: 'Herd ' + (Number.parseInt(this.herds.length) + 1),
                        herdSize: 100,
                        calvingPatterns: [
                                {
                                    patternName: 'Summer Calvers',
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
                        ],
                        color: this.getNewColor(),
                    }
                })
            },
            removeHerd(index) {
                this.herds.splice(index, 1);
            },
            saveHerds() {

            },
            refresh() {        
                //console.log('gathering');
                this.showGraph = false;
                
                this.gatherHerdData();
                //console.log('refreshing');
                this.refreshYearlyHerdData();   
                //console.log('done.');
                this.showGraph = true;
                this.$cookie.set('milk-graphs', JSON.stringify(this.herds), 30);

            },
            getMaxDate(herdData) {               
                var eDate = new Date();
                for (var i = 0; i < herdData.weekData.length; i++) {
                    var weekData = herdData.weekData[i];

                    if (weekData.dateOn > eDate) {
                        eDate = weekData.dateOn;
                    }
                }

                return eDate;
            }, 
            getMinDate(herdData) {               
                var eDate = new Date('1/1/2200');
                for (var i = 0; i < herdData.weekData.length; i++) {
                    var weekData = herdData.weekData[i];

                    if (weekData.dateOn < eDate) {
                        eDate = weekData.dateOn;
                    }
                }
               
                return eDate;
            }, 
            //returns data sets
            getWeekDataByPatternFrom(herdData, dateFrom, dateTo) {                
                var herd = this.herds.find(x => x.herdName = herdData.herdName);
                var dataSets = [];

                for (var i = 0; i < herd.calvingPatterns.length; i++) {
                    var pattern = herd.calvingPatterns[i];
                    var cDate = dateFrom;
                    var eDate = dateTo;
                    //new data set here
                    var dSet = {
                        label: herdData.herdName + ' : ' + pattern.patternName,
                        backgroundColor: this.getNewColor(),
                        data: []
                    };

                    do {
                        var volume = 0;

                        for (var wi = 0; wi < herdData.weekData.length; wi++) {
                            var weekD = herdData.weekData[wi];                                                                   
                            if (this.isSameWeekAs(cDate, weekD.dateOn)) {
                                volume += weekD.litres;
                            }
                        }

                        dSet.data.push(volume);
                        cDate = cDate.addDays(7);

                    } while (cDate <= eDate);

                    dataSets.push(dSet);
                }

                return dataSets;
            },
            //returns data set
            getWeekDataByHerdFrom(herdData, dateFrom, dateTo) {
                var herd = this.herds.find(x => x.herdName = herdData.herdName);
                var cDate = dateFrom;
                var eDate = dateTo;
                var dSet = {
                        label: herdData.herdName,
                        backgroundColor: this.getNewColor(),
                        data: []
                };

                do {
                    var volume = 0;

                    for (var i = 0; i < herdData.weekData.length; i++) {
                        var weekData = herdData.weekData[i];

                        if (this.isSameWeekAs(cDate, weekData.dateOn)) {
                            volume += weekData.litres;
                        }
                    }

                    dSet.data.push(volume);

                    cDate = cDate.addDays(7);
                } while (cDate <= eDate);

                return dSet;
            },
             //returns data sets
            getWeekDataByPattern(herdData) {
                var herd = this.herds.find(x => x.herdName = herdData.herdName);
                var dataSets = [];
                console.log(herd);
                for (var i = 0; i < herd.calvingPatterns.length; i++) {
                    var pattern = herd.calvingPatterns[i];
                    var cDate = this.getDryOffCommenceDate(pattern); //dateFrom;
                    var eDate = this.getStaleOnDate(pattern); //dateTo;
                    //new data set here
                    var dSet = {
                        label: herdData.herdName + ' : ' + pattern.patternName,
                        backgroundColor: this.getNewColor(),
                        data: []
                    };

                    do {
                        var volume = 0;

                        for (var wi = 0; wi < herdData.weekData.length; wi++) {
                            var weekD = herdData.weekData[wi];                                                                   
                            if (this.isSameWeekAs(cDate, weekD.dateOn)) {
                                volume += weekD.litres;
                            }
                        }

                        dSet.data.push(volume);
                        cDate = cDate.addDays(7);

                    } while (cDate <= eDate);

                    dataSets.push(dSet);
                }

                return dataSets;
            },
            //returns data set
            getWeekDataByHerd(herdData) {                
                var cDate = this.getMinDate(herdData);
                var eDate = this.getMaxDate(herdData);
                console.log(herdData);
                var dSet = {
                    label: herdData.herdName,
                    backgroundColor: this.getNewColor(),
                    data: []
                };

                do {
                    var volume = 0;

                    for (var i = 0; i < herdData.weekData.length; i++) {
                        var weekData = herdData.weekData[i];

                        if (this.isSameWeekAs(cDate, weekData.dateOn)) {
                            volume += weekData.litres;
                        }
                    }

                    if (this.isSameWeekAs(cDate, this.getMinDate(herdData))) {
                        console.log('blah: ' + volume);
                    }

                    dSet.data.push(volume);

                    cDate = cDate.addDays(7);
                } while (cDate <= eDate);

                return dSet;
            },
            //refreshHerdData() {
            //    var dataSets = [];
            //    var labels = [];
            //    //var sDate = this.dayOne;
            //    var sDate = new Date();

            //    for (var ii = 0; ii < this.chartHerdsData.length; ii++) {
            //        var hD = this.chartHerdsData[ii];
            //        var d = this.getMinDate(hD);
            //        if (d < sDate || ii == 0) {
            //            sDate = d;
            //        }
            //    }
               
            //    //herdData = { herdName: String, weekData: [] }
            //    for (var vv = 0; vv < this.chartHerdsData.length; vv++) {
            //        var herdData = this.chartHerdsData[vv];                                      
            //        var eDate = this.getMaxDate(herdData);

            //        if (this.isGraphOverlay == true) {
            //            if (vv == 0) {
            //                var r = 1;
            //                do {
            //                    labels.push(r);
            //                    r += 1;
            //                } while (r <= 52);
            //            }
                        
            //            if (this.isIndividualPatterns == true) {
            //                var res = this.getWeekDataByPattern(herdData);
            //                for (var i = 0; i < res.length; i++) {
            //                    dataSets.push(res[i]);
            //                }
            //            }
            //            else {                           
            //                var res = this.getWeekDataByHerd(herdData);
            //                dataSets.push(res);                                                                     
            //            }                        
            //        }
            //        else {  
            //            if (vv == 0) {
            //                var cDate = sDate;
            //                do {
            //                    labels.push(moment(cDate).format('DD MMM YYYY'));
            //                    cDate = cDate.addDays(7);
            //                } while (cDate <= eDate);
            //            }
                        
            //            if (this.isIndividualPatterns == true) {
            //                var res = this.getWeekDataByPatternFrom(herdData, sDate, eDate);
            //                for (var i = 0; i < res.length; i++) {
            //                    dataSets.push(res[i]);
            //                }
            //            }
            //            else {                           
            //                var res = this.getWeekDataByHerdFrom(herdData, sDate, eDate);
            //                dataSets.push(res);
            //                //dataSets.push({
            //                //    label: herdData.herdName,
            //                //    backgroundColor: this.getNewColor(),
            //                //    data: this.getHerdLineValues(herdData.patternData),
            //                //})                                                    
            //            }                        
            //        }
            //    }    

            //    this.chartData = {
            //        labels: labels.length > 0 ? labels : null,
            //        datasets: dataSets,
            //    };

            //    //this.chartData = data;                
            //},         
            refreshYearlyHerdData() {
                var dataSets = [];
                var labels = [];
                //var sDate = this.dayOne;                
                for (var i = 0; i < this.chartHerdsData.length; i++) {
                    var herdData = this.chartHerdsData[i];

                    var sDate = this.dayOne;
                    var dMultiple = this.showTwoYears ? 104 : 52;
                    var eDate = sDate.addDays(dMultiple * 7);
                    var dSet = {
                        label: herdData.herdName,
                        backgroundColor: herdData.color, //this.getNewColor(),
                        data: []
                    }

                    do {
                        if (i == 0) {
                            //labels
                            labels.push(moment(sDate).format('DD MMM'));
                        }
                        var volume = 0;
                        var cows = 0;

                        for (var wi = 0; wi < herdData.weekData.length; wi++) {
                            var weekD = herdData.weekData[wi];                                                                   
                            if (this.isSameYearlyWeekAs(this.dayOne, sDate, weekD.dateOn)) {
                                volume += weekD.litres;
                                if (weekD.litres > 0) {
                                    cows += weekD.cows;
                                }                                
                            }
                        }
                        
                        if (this.propToShow == 'Average') {
                            if (cows > 0 && volume > 0) {
                                dSet.data.push(volume / cows);                            
                            }
                            else {
                                dSet.data.push(0);
                            }                            
                        }
                        else if (this.propToShow == 'Cows In Milk') {
                            dSet.data.push(cows);
                        }
                        else {
                            dSet.data.push(volume);
                        }

                        //dSet.data.push(volume);

                        sDate = sDate.addDays(7);
                    } while (sDate < eDate);

                    dataSets.push(dSet);
                }

                this.exportYearlyHerdData();

                this.chartData = {
                    labels: labels,
                    datasets: dataSets,
                };
            },         
            exportYearlyHerdData() {                
                var data = [];
                //var sDate = this.dayOne;                
                for (var i = 0; i < this.chartHerdsData.length; i++) {
                    var herdData = this.chartHerdsData[i];                    
                    var sDate = this.dayOne;
                    var eDate = sDate.addDays(52 * 7);
                    var weekNumber = 0;
                    do {                       
                        var volume = 0;
                        var cows = 0;

                        for (var wi = 0; wi < herdData.weekData.length; wi++) {
                            var weekD = herdData.weekData[wi];                                                                   
                            if (this.isSameYearlyWeekAs(this.dayOne, sDate, weekD.dateOn)) {
                                volume += weekD.litres;
                                if (weekD.litres > 0) {
                                    cows += weekD.cows;
                                }                                
                            }
                        }

                        var avg = 0;
                        if (cows > 0 && volume > 0) {
                            avg = volume / cows;                            
                        }

                        var eItem = data[weekNumber];

                        if (eItem == null) {
                            eItem = {
                                dateOn: moment(sDate).format('DD MMM'),
                            };

                            data.push(eItem);
                        };

                        eItem[herdData.herdName + ' Average'] = avg;
                        eItem[herdData.herdName + ' Milking Cows'] = cows;
                        eItem[herdData.herdName + ' Litres'] = volume;

                        //data.push({
                        //    herd: herdData.herdName,
                        //    dateOn: moment(sDate).format('DD MMM'),
                        //    average: avg,
                        //    cowsInMilk: cows,
                        //    litres: volume,
                        //});
                        weekNumber += 1;

                        sDate = sDate.addDays(7);
                    } while (sDate < eDate);

                    //herdSets.push({
                    //    herd: herdData.herdName,
                    //    data: dSet
                    //});
                }

                //console.log(data);
                this.jsonData = data; // JSON.stringify(data);
                //this.jsonData = this.convertToCSV(data);                

            },     
            convertToCSV(objArray) {
                var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
                var str = '';
                for (var i = 0; i < array.length; i++) {
                    var line = '';
                    for (var index in array[i]) {
                        if (line != '') line += ','
                        line += array[i][index];
                    }
                    str += line + '\r\n';
                }
                return str;
            },
            exportCSVFile(headers, items, fileTitle) {

                if (headers) {

                    items.unshift(headers);

                }
                // Convert Object to JSON
                var jsonObject = JSON.stringify(items);
                var csv = this.convertToCSV(jsonObject);
                var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
                var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                if (navigator.msSaveBlob) { // IE 10+
                    navigator.msSaveBlob(blob, exportedFilenmae);
                } else {
                    var link = document.createElement("a");
                   if (link.download !== undefined) { // feature detection

            // Browsers that support HTML5 download attribute
                        var url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", exportedFilenmae);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            },
            gatherHerdData() {
                var herdObjects = [];

                for (var i = 0; i < this.herds.length; i++) {
                    var herd = this.herds[i];

                    herdObjects.push({
                        herdName: herd.herd.herdName,
                        color: herd.herd.color,
                        weekData: this.createYearlyHerdData(herd.herd),// this.createHerdData(herd.herd)
                    });
                }
               
                this.chartHerdsData = herdObjects;
            },            
            //createHerdData(herd) {                
            //    var patternData = [];                
            //    var carryOvers = 0;                
            //    var weekData = [];                
            //    var sDate = new Date();

            //    herd.calvingPatterns.orderBy('dateFrom');

            //     //week data = { dateOn, patternName, miniHerdNumber, cows, status, litres }

            //    for (var i = 0; i < herd.calvingPatterns.length; i++) {                    
            //        var pattern = herd.calvingPatterns[i];
            //        var dryDate = this.getDryOffCommenceDate(pattern);
            //        var staleDate = this.getStaleOnDate(pattern);
            //        var nextCalvingPatternDate = staleDate;
            //        if (i + 1 < herd.calvingPatterns.length) {
            //            nextCalvingPatternDate = this.getDryOffCommenceDate(herd.calvingPatterns[(i + 1)]);
            //        }

            //        if (i == 0) {
            //            sDate = dryDate;
            //        }
                    
            //        pattern.herdSize = herd.herdSize * (pattern.herdRatio / 100);   

            //        var startDate = sDate;
            //        do {
            //            if (startDate < dryDate) {
            //                weekData.push({
            //                    dateOn: startDate,
            //                    patternName: pattern.patternName,
            //                    miniHerdNumber: 0,
            //                    cows: pattern.herdSize,
            //                    status: 'stale',
            //                    litres: pattern.herdSize * pattern.staleAvg,
            //                });
            //            }                        
            //            startDate = startDate.addDays(7);
            //        } while (startDate < dryDate);

            //        pattern.herdSize += carryOvers;
            //        pattern.fertileCows = pattern.herdSize * (pattern.fertilityRate / 100);                    
            //        carryOvers = pattern.herdSize - pattern.fertileCows;

            //        //var patternObj = this.formDryCowsWeekly(pattern);
            //        var weeksData = this.formDryCowWeeks(pattern);
            //        for (var ii = 0; ii < weeksData.length; ii++) {
            //            weekData.push(weeksData[ii]);
            //        }

            //        //week data = { dateOn, patternName, miniHerdNumber, cows, status, litres }

            //        //add stale cow herd week data
            //        var currentDate = dryDate;
            //        do {
            //            weekData.push({
            //                dateOn: currentDate,
            //                patternName: pattern.patternName,
            //                miniHerdNumber: 0,
            //                cows: carryOvers,
            //                status: 'stale',
            //                litres: carryOvers * pattern.staleAvg,
            //            });

            //            currentDate = currentDate.addDays(7);
            //        } while (currentDate < nextCalvingPatternDate);                    
            //    }                

            //    return weekData;

            //    //this.herdsData = {
            //    //    herdName: herd.herdName,
            //    //    patternData: patternData,
            //    //};

            //    //return this.herdsData;
            //}, 
            createYearlyHerdData(herd) {                
                var patternData = [];                
                var carryOvers = 0;                
                var weekData = [];                
                var sDate = this.dayOne
                var eDate = sDate.addDays(52 * 7);

                herd.calvingPatterns.orderBy('dateFrom');

                 //week data = { dateOn, patternName, miniHerdNumber, cows, status, litres }

                for (var i = 0; i < herd.calvingPatterns.length; i++) {                    
                    var pattern = herd.calvingPatterns[i];
                    var dryDate = this.getDryOffCommenceDate(pattern);
                    var staleDate = this.getStaleOnDate(pattern);
                    var nextCalvingPatternDate = staleDate;
                    if (i + 1 < herd.calvingPatterns.length) {
                        nextCalvingPatternDate = this.getDryOffCommenceDate(herd.calvingPatterns[(i + 1)]);
                    }

                    //if (i == 0) {
                    //    sDate = dryDate;
                    //}
                    
                    pattern.herdSize = herd.herdSize * (pattern.herdRatio / 100);   

                    //var startDate = sDate;
                    //do {
                    //    if (startDate < dryDate) {
                    //        weekData.push({
                    //            dateOn: startDate,
                    //            patternName: pattern.patternName,
                    //            miniHerdNumber: 0,
                    //            cows: pattern.herdSize,
                    //            status: 'stale',
                    //            litres: pattern.herdSize * pattern.staleAvg,
                    //        });
                    //    }                        
                    //    startDate = startDate.addDays(7);
                    //} while (startDate < dryDate);

                    pattern.herdSize += carryOvers;
                    pattern.fertileCows = pattern.herdSize * (pattern.fertilityRate / 100);                    
                    carryOvers = pattern.herdSize - pattern.fertileCows;

                    //var patternObj = this.formDryCowsWeekly(pattern);
                    var weeksData = this.formDryCowYears(pattern);
                    for (var ii = 0; ii < weeksData.length; ii++) {
                        weekData.push(weeksData[ii]);
                    }

                    //week data = { dateOn, patternName, miniHerdNumber, cows, status, litres }

                    //add stale cow herd week data
                    var currentDate = dryDate;
                    do {
                        weekData.push({
                            dateOn: currentDate,
                            patternName: pattern.patternName,
                            miniHerdNumber: 0,
                            cows: carryOvers,
                            status: 'stale',
                            litres: carryOvers * pattern.staleAvg,
                        });

                        currentDate = currentDate.addDays(7);
                    } while (currentDate < nextCalvingPatternDate);                    
                }                

                return weekData;

                //this.herdsData = {
                //    herdName: herd.herdName,
                //    patternData: patternData,
                //};

                //return this.herdsData;
            }, 
            isSameYearlyWeekAs(oWeekDate, d1, d2) {                
                if (d1 == d2) {
                    return true;
                }

                var d1Dif = this.inDays(oWeekDate, d1);
                var d2Dif = this.inDays(oWeekDate, d2);

                if (d1Dif > d2Dif) {
                    do {
                        d1Dif -= 364;
                    } while (d1Dif > d2Dif);
                }
                if (d2Dif > d1Dif) {
                    do {
                        d2Dif -= 364;
                    } while (d2Dif > d1Dif);
                }

                var t = d1Dif == d2Dif;

                if (t == true) {
                    //console.log(moment(d1).format('DD MMM YYYY') + ' matches ' + moment(d2).format('DD MMM YYYY'));
                }

                if (moment(d1).format('DD MMM YYYY') == '22 Mar 2021') {
                    //console.log('D1 hmm ' + moment(d2).format('DD MMM YYYY'));
                    if (d1Dif == -449) {
                        console.log(moment(d1).format('DD MMM YYYY') + ' matches ' + moment(d2).format('DD MMM YYYY'));
                    }
                    console.log('D1| dif1: ' + d1Dif + ' | dif2: ' + d2Dif);
                }
                if (moment(d2).format('DD MMM YYYY') == '23 Mar 2020') {
                    if (d1Dif == -449) {
                        console.log(moment(d1).format('DD MMM YYYY') + ' matches ' + moment(d2).format('DD MMM YYYY'));
                    }
                    //console.log('D2 hmm ' + moment(d1).format('DD MMM YYYY'));
                    console.log('D2| dif1: ' + d1Dif + ' | dif2: ' + d2Dif);
                }

                return t;
                //if (d1 < oWeekDate) {
                //    do {
                //        d1 = d1.addDays(364);
                //    } while (d1 < oWeekDate);
                //}

                //if (d2 < oWeekDate) {
                //    do {                        
                //        d2 = d2.addDays(364);                        
                //    } while (d2 < oWeekDate);
                //}
                
                //var weekDif1 = this.inWeeks(oWeekDate, d1);
                //var weekDif2 = this.inWeeks(oWeekDate, d2);

                //if (weekDif1 > 52) {
                //    do {                        
                //        d1 = d1.addDays(-364);
                //        weekDif1 = this.inWeeks(oWeekDate, d1);                        
                //    } while (weekDif1 > 52);
                //}

                //if (weekDif2 > 52) {
                //    do {                        
                //        d2 = d2.addDays(-364);
                //        weekDif2 = this.inWeeks(oWeekDate, d2);                        
                //    } while (weekDif2 > 52);              
                //}                

                //return weekDif1 == weekDif2;
            },
            isSameWeekAs(d1, d2) {
                //return moment(d1).isSame(d2, 'day') || d1 >= d2 && d1 < (d2.addDays(7));                                
                return d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth();
            },
            //returns [ { dateOn, patternName, miniHerdNumber, cows, status, litres } ]
            formDryCowYears(pattern) {
                var sDate = this.getDryOffCommenceDate(pattern);                
                var firstHalf = this.getFirstDryHalfRate(pattern);
                var secondHalf = this.getSecondDryHalfRate(pattern);                
                var weekNumber = 0;
                var calvingWeeks = this.inWeeks(pattern.dateFrom, pattern.dateTo);
                console.log('weeks of calving: ' + calvingWeeks);
                //var cows = [];                                
                var weekVolumes = [];

                if (calvingWeeks == 0 && pattern.dateFrom == pattern.dateTo) {
                    calvingWeeks = 1;
                }                

                do {
                    var dryDate = sDate.addDays(7 * weekNumber);
                    var calveDate = dryDate.addDays(7 * pattern.weeksDry);
                    var peakDate = calveDate.addDays(7 * pattern.weeksToPeak);
                    var peakEndDate = peakDate.addDays(7 * pattern.weeksOfPeak);
                    var staleDate = peakEndDate.addDays(7 * pattern.weeksTillStale);
                    var cowCount = weekNumber < pattern.halfPercentDryWeek ? firstHalf : secondHalf;
                  
                    //organize production
                    //var currentDate = dryDate;
                    //var currentDate = sDate;
                    //var endDate = currentDate.addDays(52 * 7);
                    var currentDate = dryDate;
                    var endDate = currentDate.addDays(52 * 7);
                    
                    do {
                        //register production
                        var weekVolume = {
                            patternName: pattern.patternName,
                            miniHerdNumber: weekNumber,
                            dateOn: currentDate,                            
                            cows: cowCount,
                            status: null,
                            litres: 0
                        };
                      
                        //if (currentDate < dryDate) {
                        //    weekVolume.status = 'stale';
                        //    weekVolume.litres = weekVolume.cows * pattern.staleAvg;
                        //}
                        //else
                        if (currentDate < calveDate) {
                            //already done
                            weekVolume.status = 'dry';
                        }
                        else if (currentDate <= peakDate) {
                            var peakWeek = this.inWeeks(currentDate, peakDate);
                            var avgDif = pattern.peakAvg - pattern.freshAvg;
                            var avg = pattern.freshAvg;
                            weekVolume.status = 'fresh';

                            if (peakWeek >= 0) {
                                avg = pattern.freshAvg + ((pattern.weeksToPeak - peakWeek) * (avgDif / pattern.weeksToPeak));
                            }

                            weekVolume.litres = weekVolume.cows * avg;
                        }
                        else if (currentDate <= peakEndDate) {
                            weekVolume.status = 'fresh';
                            weekVolume.litres = weekVolume.cows * pattern.peakAvg;
                        }
                        else if (currentDate <= staleDate) {
                            var staleWeek = this.inWeeks(currentDate, staleDate);
                            var avgDif = pattern.peakAvg - pattern.staleAvg;
                            var avg = pattern.staleAvg;
                            weekVolume.status = 'fresh';
                            if (staleWeek >= 0) {
                                avg = pattern.peakAvg - ((pattern.weeksTillStale - staleWeek) * (avgDif / pattern.weeksTillStale));
                            }

                            weekVolume.litres = weekVolume.cows * avg;
                        }
                        else {
                            //add stale week
                            weekVolume.status = 'stale';
                            weekVolume.litres = weekVolume.cows * pattern.staleAvg;
                        }

                        weekVolumes.push(weekVolume);

                        //weekNumber += 1;
                        currentDate = currentDate.addDays(7);

                    } while (currentDate < endDate);

                    weekNumber += 1;

                } while (weekNumber < calvingWeeks);
                
                return weekVolumes;

                //var obj = {
                //    patternName: pattern.patternName,
                //    weekVolumes: weekVolumes,
                //    //carryOvers: pattern.herdSize <= 0 ? 0 : pattern.herdSize - (pattern.herdSize * (pattern.fertilityRate / 100)),
                //    //cowWeeks: cows
                //};
             
                //return obj;
            }, 
            //formDryCowWeeks(pattern) {
            //    var sDate = this.getDryOffCommenceDate(pattern);                
            //    var firstHalf = this.getFirstDryHalfRate(pattern);
            //    var secondHalf = this.getSecondDryHalfRate(pattern);                
            //    var weekNumber = 0;
            //    var calvingWeeks = this.inWeeks(pattern.dateFrom, pattern.dateTo);
            //    //var cows = [];                                
            //    var weekVolumes = [];

            //    if (calvingWeeks == 0 && pattern.dateFrom == pattern.dateTo) {
            //        calvingWeeks = 1;
            //    }                

            //    do {
            //        var dryDate = sDate.addDays(7 * weekNumber);
            //        var calveDate = dryDate.addDays(7 * pattern.weeksDry);
            //        var peakDate = calveDate.addDays(7 * pattern.weeksToPeak);
            //        var peakEndDate = peakDate.addDays(7 * pattern.weeksOfPeak);
            //        var staleDate = peakEndDate.addDays(7 * pattern.weeksTillStale);
            //        var cowCount = weekNumber < pattern.halfPercentDryWeek ? firstHalf : secondHalf;
                  
            //        //organize production
            //        //var currentDate = dryDate;
            //        var currentDate = sDate;
            //        do {
            //            //register production
            //            var weekVolume = {
            //                patternName: pattern.patternName,
            //                miniHerdNumber: weekNumber,
            //                dateOn: currentDate,
            //                cows: cowCount,
            //                status: null,
            //                litres: 0
            //            };
                      
            //                if (currentDate < dryDate) {
            //                    weekVolume.status = 'stale';
            //                    weekVolume.litres = weekVolume.cows * pattern.staleAvg;
            //                }
            //                else if (currentDate <= calveDate) {
            //                    //already done
            //                    weekVolume.status = 'dry';
            //                }
            //                else if (currentDate <= peakDate) {
            //                    var peakWeek = this.inWeeks(currentDate, peakDate);
            //                    var avgDif = pattern.peakAvg - pattern.freshAvg;
            //                    var avg = pattern.freshAvg;
            //                    weekVolume.status = 'fresh';

            //                    if (peakWeek >= 0) {
            //                        avg = pattern.freshAvg + ((pattern.weeksToPeak - peakWeek) * (avgDif / pattern.weeksToPeak));
            //                    }

            //                    weekVolume.litres = weekVolume.cows * avg;
            //                }
            //                else if (currentDate <= peakEndDate) {
            //                    weekVolume.status = 'fresh';
            //                    weekVolume.litres = weekVolume.cows * pattern.peakAvg;
            //                }
            //                else if (currentDate <= staleDate) {
            //                    var staleWeek = this.inWeeks(currentDate, staleDate);
            //                    var avgDif = pattern.peakAvg - pattern.staleAvg;
            //                    var avg = pattern.staleAvg;
            //                    weekVolume.status = 'fresh';
            //                    if (staleWeek >= 0) {
            //                        avg = pattern.peakAvg - ((pattern.weeksTillStale - staleWeek) * (avgDif / pattern.weeksTillStale));
            //                    }

            //                    weekVolume.litres = weekVolume.cows * avg;
            //                }

            //            weekVolumes.push(weekVolume);
                      
            //            currentDate = currentDate.addDays(7);

            //        } while (currentDate <= staleDate);

            //        weekNumber += 1;

            //    } while (weekNumber < calvingWeeks);

            //    return weekVolumes;

            //    //var obj = {
            //    //    patternName: pattern.patternName,
            //    //    weekVolumes: weekVolumes,
            //    //    //carryOvers: pattern.herdSize <= 0 ? 0 : pattern.herdSize - (pattern.herdSize * (pattern.fertilityRate / 100)),
            //    //    //cowWeeks: cows
            //    //};
             
            //    //return obj;
            //},         
            getStaleOnDate(pattern) {
                return pattern.dateTo.addDays(7 * (pattern.weeksToPeak + pattern.weeksOfPeak + pattern.weeksTillStale));
            },
            getDryOffCommenceDate(pattern) {
                //var d = new Date(pattern.dateFrom);
                return pattern.dateFrom.addDays(0 - (7 * pattern.weeksDry));
            },
            getFirstDryHalfRate(pattern) {  
                var calvingWeeks = this.inWeeks(pattern.dateFrom, pattern.dateTo);
                
                if (calvingWeeks == 0 || pattern.dateFrom == pattern.dateTo) {
                    calvingWeeks = 1;
                }

                if (pattern.useHalfPercent == true && pattern.halfPercentDryWeek < calvingWeeks) {
                    //var halfCowsToDry = (pattern.herdSize * (pattern.fertilityRate / 100)) / 2;                    
                    //var halfCowsToDry = pattern.fertileCows / 2;                    
                    return (pattern.fertileCows / 2) / pattern.halfPercentDryWeek;
                }
                else {
                    return pattern.fertileCows / calvingWeeks;
                    //return (pattern.herdSize * (pattern.fertilityRate / 100)) / calvingWeeks;
                }
            },
            getSecondDryHalfRate(pattern) {                
                var weeks = this.inWeeks(pattern.dateFrom, pattern.dateTo);

                if (weeks == 0 || pattern.dateFrom == pattern.dateTo) {
                    weeks = 1;
                }

                if (pattern.useHalfPercent == true && pattern.halfPercentDryWeek < weeks) {
                    //var halfCowsToDry = (pattern.herdSize * (pattern.fertilityRate / 100)) / 2;
                    //console.log('second half: ' + halfCowsToDry / (weeks - pattern.halfPercentDryWeek));
                    //return halfCowsToDry / (weeks - pattern.halfPercentDryWeek);
                    return (pattern.fertileCows / 2) / (weeks - pattern.halfPercentDryWeek);
                }
                else {
                    //return (pattern.herdSize * (pattern.fertilityRate / 100)) / weeks;
                    return pattern.fertileCows / weeks;
                }                                
            },
            getAllStaleOnDate(pattern) {
                return pattern.dateTo + (7 * (pattern.weeksToPeak + pattern.weeksOfPeak + pattern.weeksTillStale));                                
            },        
            getNewColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color + '70';
            },
            getPatternLineValues(vObjects) {                
                var volumeObjects = vObjects;
                volumeObjects.orderBy('dateOn');

                if (this.showProp == 'Litres') {
                    return volumeObjects.map(x => x.litres);
                }
                else if (this.showProp == 'Average') {
                    return volumeObjects.map(x => x.litres / x.inMilk);
                }
                else if (this.showProp == 'CowsInMilk') {
                    return volumeObjects.map(x => x.inMilk);
                }
            },
            getHerdLineValues(vObjects) {   
                console.log(vObjects);
                var volumeObjects = vObjects.selectMany(x => x.patternData);
                
                if (this.showProp == 'Litres') {
                    return volumeObjects.map(x => x.litres);
                }
                else if (this.showProp == 'Average') {
                    return volumeObjects.map(x => x.litres / x.inMilk);
                }
                else if (this.showProp == 'CowsInMilk') {
                    return volumeObjects.map(x => x.inMilk);
                }
            },
            inDays: function(d1, d2) {
                var t2 = d2.getTime();
                var t1 = d1.getTime();
                return parseInt((t2 - t1) / (24 * 3600 * 1000));
            },
            //smaller date then larger date
            inWeeks: function (d1, d2) {
                var t2 = d2.getTime();
                var t1 = d1.getTime();
                return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
            },
            inMonths: function (d1, d2) {
                var d1Y = d1.getFullYear();
                var d2Y = d2.getFullYear();
                var d1M = d1.getMonth();
                var d2M = d2.getMonth();
                return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
            },
            inYears: function (d1, d2) {
                return d2.getFullYear() - d1.getFullYear();
            }
        }
    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .full-screen {
        min-height: 100vh;
    }

    .below-nav {
        margin-top: 60px;
    }

</style>



