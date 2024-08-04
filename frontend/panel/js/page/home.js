import {$, url} from "../../../js/base.js";
import {adminProtection} from "../panel utilities/adminProtection.js";
import {fetchData} from "../../../js/utilities/fetchData.js";

window.addEventListener("load", async () => {
    await adminProtection()
})

// Initialize Swiper slider
const swiper = new Swiper(".swiper-chart", {

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    keyboard: true,
})

// Config charts
const chartOption = (name, data, color) => {
    return {
        chart: {
            type: 'area',
            toolbar: {
                show: false,
            },
            width: '100%',
            height: '100%'
        },
        series: [{
            name,
            data
        }],
        xaxis: {
            categories: ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"]
        },
        stroke: {
            width: 2,
        },
        theme: {
            monochrome: {
                enabled: true,
                color: color
            }
        }
    }
}


const saleChartElm = $.querySelector(".sale-chart")
const salesData = [650000, 590000, 800000, 810000, 560000, 550000, 400000]
const saleChart = new ApexCharts(saleChartElm, chartOption("فروش", salesData, '#38bdf8'))
saleChart.render()

const costsChartElm = $.querySelector(".cost-chart")
const costsData = [130000, 250000, 900000, 210000, 360000, 190000, 340000]
const costsChart = new ApexCharts(costsChartElm, chartOption("هزینه ها", costsData, '#ff0854'))
costsChart.render()

const incomeChartElm = $.querySelector(".income-chart")
const incomesData = salesData.map((sale, index) => {
    return sale - costsData[index]
})
const incomeChart = new ApexCharts(incomeChartElm, chartOption("درآمد", incomesData, '#39CD84'))
incomeChart.render()
