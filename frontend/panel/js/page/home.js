import {$} from "../../../js/base.js";

// Initialize Swiper
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

const incomeChartElm = $.querySelector(".income-chart")
const incomesData = [65, 59, 80, 81, 56, 55, 40]
const incomeChart = new ApexCharts(incomeChartElm, chartOption("درآمد", incomesData, '#39CD84'))
incomeChart.render()

const saleChartElm = $.querySelector(".sale-chart")
const salesData = [65, 59, 80, 81, 56, 55, 40]
const saleChart = new ApexCharts(saleChartElm, chartOption("فروش", salesData, '#38bdf8'))
saleChart.render()

const costsChartElm = $.querySelector(".cost-chart")
const costsData = [65, 59, 80, 81, 56, 55, 40]
const costsChart = new ApexCharts(costsChartElm, chartOption("هزینه ها", costsData, '#ff0854'))
costsChart.render()